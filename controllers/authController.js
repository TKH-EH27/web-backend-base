const { db } = require('../db');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Please provide all required fields.'
        });
    }

    const role = 'user'; // Default role for registered users
    const query = `
        INSERT INTO USERS (USERNAME, EMAIL, PASSWORD, ROLE)
        VALUES ('${username}', '${email}', '${password}', '${role}')
    `;

    try {
        const [result] = await db.query(query); 

        const createdUserQuery = `
            SELECT * FROM USERS WHERE ID = ${result.insertId}
        `;
        const [newUser] = await db.query(createdUserQuery); 

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