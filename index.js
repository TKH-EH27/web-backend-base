const express = require('express');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON data from request bodies
app.use(express.json());


app.use('/users', userRouter);
app.use('/auth', authRouter);


module.exports = {
  app,
};