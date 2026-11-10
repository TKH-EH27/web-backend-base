const { db } = require('../db');
const {
    sanitizeInput,
    validateRequired,
    validateEmail,
    validatePassword
} = require('../utils/validators');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Clean input
    const cleanUsername = sanitizeInput(username);

    const cleanEmail = sanitizeInput(email);

    // Do NOT trim or lowercase passwords
    const cleanPassword = password;

    // 2. Check required fields
    const requiredError = validateRequired(
        {
            username: cleanUsername,
            email: cleanEmail,
            password: cleanPassword
        },
        ['username', 'email', 'password']
    );

    if (requiredError) {
        return res.status(400).json({
            message: requiredError
        });
    }

    // 3. Validate email
    const emailError = validateEmail(cleanEmail);

    if (emailError) {
        return res.status(400).json({
            message: emailError
        });
    }

    // 4. Validate password
    const passwordError = validatePassword(cleanPassword);

    if (passwordError) {
        return res.status(400).json({
            message: passwordError
        });
    }

    // 5. Insert user into database
    const query = `
        INSERT INTO USERS (USERNAME, EMAIL, PASSWORD)
        VALUES ('${cleanUsername}', '${cleanEmail}', '${cleanPassword}')
    `;

    try {
        const [result] = await db.query(query);

        const [newUser] = await db.query(
            `SELECT ID, USERNAME, EMAIL, ROLE
             FROM USERS WHERE ID = ${result.insertId}`
        );

        return res.status(201).json({
            message: 'User registered successfully',
            data: newUser[0]
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }

        return res.status(500).json({
            message: 'Database error'
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Please provide both email and password.'
        });
    }
    const query = `
        SELECT * FROM USERS WHERE EMAIL = '${email}'
    `;

    try {
        const [users] = await db.query(query);
        if (users.length === 0) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const user = users[0];
        if (user.PASSWORD !== password) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        return res.status(200).json({
            message: 'User logged in successfully',
            data: users[0]
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Database error',
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};