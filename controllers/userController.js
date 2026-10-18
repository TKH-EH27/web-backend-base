const { users } = require('../models/User');

// Retrieve all users
const retrieveAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Users retrieved successfully',
        results: users.length,
        data: users
    });
}

// Create a new user
const createUser = (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide all required fields.'
        });
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        role
    };

    users.push(newUser);

    res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: newUser
    });
}

// Retrieve a specific user by ID
const retrieveUserById = (req, res) => {
    const id = Number(req.params.id);

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            return res.status(200).json({
                status: 'success',
                data: users[i]
            });
        }
    }

    return res.status(404).json({
        status: 'fail',
        message: 'User not found'
    });
}


// Update a specific user by ID
const updateUserById = (req, res) => {
    const id = Number(req.params.id);
    const { username, password, role } = req.body;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {

            if (!username || !password || !role) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Please provide all required fields.'
                });
            }

            users[i].username = username;
            users[i].password = password;
            users[i].role = role;

            return res.status(200).json({
                status: 'success',
                message: 'User updated successfully',
                data: users[i]
            });
        }
    }

    return res.status(404).json({
        status: 'fail',
        message: 'User not found'
    });
}

// Delete a specific user by ID
const deleteUserById = (req, res) => {
    const id = Number(req.params.id);

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users.splice(i, 1); 

            return res.status(200).json({
                status: 'success',
                message: 'User deleted successfully'
            });
        }   

        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
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