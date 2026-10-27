const { db } = require('../db');

// Retrieve all users
const retrieveAllUsers = async (req, res) => {
    try {
        query = 'SELECT * FROM USER';
        const [users] = await db.query(query);
    
        return res.status(200).json({
            status: 'success',
            results: users.length,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Database error',
        });
    }
}

// Create a new user
const createUser = async(req, res) => {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role || !password) {
        return res.status(400).json({
            message: 'Please provide all required fields.'
        });
    }

    // db insertion
    const query = `
        INSERT INTO USER (NAME, EMAIL, PASSWORD, ROLE)
        VALUES ('${name}', '${email}', '${password}', '${role}')
    `;

    try {
        const [result] = await db.query(query);

        const createdUserQuery = `
            SELECT * FROM USER WHERE ID = ${result.insertId}
        `;
        const [newUser] = await db.query(createdUserQuery);
        
        return res.status(201).json({
            message: 'User created successfully',
            data: newUser[0]
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Database error',
        });
    }
}

// Retrieve a specific user by ID
const retrieveUserById = async (req, res) => {
    const id = Number(req.params.id);

    const query = `SELECT * FROM USER WHERE ID = ${id}`;

    try {
        const [users] = await db.query(query);

        if (users.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        return res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Database error',
        });
    }
}

// Update a specific user by ID partial update
const updateUserById = async (req, res) => {
    const id = Number(req.params.id);
    const { name, email, password, role } = req.body;

    if (!name && !email && !password && !role) {
        return res.status(400).json({
            message: 'Please provide at least one field to update.'
        });
    }

    const selectQuery = `SELECT * FROM USER WHERE ID = ${id}`;
    const [users] = await db.query(selectQuery);

    if (users.length === 0) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const updatedName = name || users[0].NAME;
    const updatedEmail = email || users[0].EMAIL;
    const updatedPassword = password || users[0].PASSWORD;
    const updatedRole = role || users[0].ROLE;

    const query = `
        UPDATE USER
        SET NAME = '${updatedName}',
            EMAIL = '${updatedEmail}',
            PASSWORD = '${updatedPassword}',
            ROLE = '${updatedRole}'
        WHERE ID = ${id}
    `;

    try {
        const [result] = await db.query(query);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const updatedUserQuery = `SELECT * FROM USER WHERE ID = ${id}`;
        const [updatedUser] = await db.query(updatedUserQuery);

        return res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Database error',
        });
    }
}

// Delete a specific user by ID
const deleteUserById = async (req, res) => {
    const id = Number(req.params.id);

    const query = `DELETE FROM USER WHERE ID = ${id}`;

    try {
        const [result] = await db.query(query);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Database error',
        });
    }
}

module.exports = {
    retrieveAllUsers,
    createUser,
    retrieveUserById,
    updateUserById,
    deleteUserById
};