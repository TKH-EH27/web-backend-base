// const { users } = require('../models/User');
const { db } = require('../db');

// Retrieve all users
const retrieveAllUsers = (req, res) => {
    try {
        query = 'SELECT * FROM USER';
        const users = db.prepare(query).all();
    
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
const createUser = (req, res) => {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role || !password) {
        return res.status(400).json({
            message: 'Please provide all required fields.'
        });
    }

    // db insertion
    const query = `
        INSERT INTO USER (NAME, EMAIL, ROLE, PASSWORD)
        VALUES ('${name}', '${email}', '${role}', '${password}')
    `;

    try {
        const result = db.prepare(query).run();

        const createdUserQuery = `
            SELECT * FROM USER WHERE ID = ${result.lastInsertRowid}
        `;
        const newUser = db.prepare(createdUserQuery).get();
        
        return res.status(201).json({
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Database error',
        });
    }
}

// Retrieve a specific user by ID
const retrieveUserById = (req, res) => {
    const id = Number(req.params.id);

    const query = `SELECT * FROM USER WHERE ID = ${id}`;

    try {
        const user = db.prepare(query).get();

        if (!user) {
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



// Update a specific user by ID
const updateUserById = (req, res) => {
    const id = Number(req.params.id);
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
        return res.status(400).json({
            message: 'Please provide all required fields.'
        });
    }

    const query = `
        UPDATE USER
        SET NAME = '${name}',
            EMAIL = '${email}',
            ROLE = '${role}',
            PASSWORD = '${password}'
        WHERE ID = ${id}
    `;

    try {
        const result = db.prepare(query).run();

        if (result.changes === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const updatedUserQuery = `SELECT * FROM USER WHERE ID = ${id}`;
        const updatedUser = db.prepare(updatedUserQuery).get();

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
const deleteUserById = (req, res) => {
    const id = Number(req.params.id);

    const query = `DELETE FROM USER WHERE ID = ${id}`;

    try {
        const result = db.prepare(query).run();

        if (result.changes === 0) {
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