const express = require('express');
const {
  retrieveAllUsers,
  createUser,
  retrieveUserById,
  updateUserById,
  deleteUserById
} = require('../controllers/userController');

const userRouter = express.Router();

// All users
userRouter.post('/', createUser)        // Add new user
userRouter.get('/', retrieveAllUsers);  // Get all users

// Specific user
userRouter.get('/:id', retrieveUserById); // Get a specific user
userRouter.put('/:id', updateUserById); // Update a specific user
userRouter.delete('/:id', deleteUserById); // Delete a specific user

module.exports = userRouter; 