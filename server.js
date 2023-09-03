const http = require('http');
const dbConnection = require('./dbConnection');
const authController = require('./controllers/authController');
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT; 
require('dotenv').config();

const address = '127.0.0.1';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));


app.use('/auth', authController);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const server = http.createServer(app);

server.listen(port, address, () => {
  console.log(`Server is running on localhost:`+port);
});

process.on('exit', () => {
    dbConnection.end(); 
  });
