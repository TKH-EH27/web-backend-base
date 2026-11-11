const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const tripRouter = require('./routes/tripRoutes');

// Create an instance of the Express application
const app = express();

// Use middleware to parse JSON data from request bodies
app.use(express.json());
app.use(cookieParser());


app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/trips', tripRouter);


module.exports = {
  app,
};