const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');

//Load ENV vars
dotenv.config({ path: './config/config.env' });

connectDB();

const messages = require('./routes/messages');

const app = express();

//Body parser
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/messages', messages);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} in port ${PORT}`.yellow.bold
  )
);
