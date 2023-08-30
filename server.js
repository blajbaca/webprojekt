const mysql = require('mysql');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; 
const dbConnection = require('dbConnection');
const authController = require('./controllers/authController');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

app.use('/auth', authController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('exit', () => {
    dbConnection.end(); 
  });