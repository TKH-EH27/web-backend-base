const express = require('express');
const userRouter = require('./routes/userRoutes');

// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON data from request bodies
app.use(express.json());


app.use('/users', userRouter);

module.exports = {
  app,
};