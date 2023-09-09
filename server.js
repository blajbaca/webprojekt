const http = require('http');
const dbConnection = require('./dbConnection');
const authRoutes = require('./routes/authRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const port = process.env.SERVER_PORT;
require('dotenv').config();

const address = '127.0.0.1';
const oneDay = 1000 * 24 * 60 * 60;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.use(sessions({
  secret: "secretkeyhehexd123",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/exercises', exerciseRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/loginLanding.html');
})

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/registerLanding.html');
})

app.get('/workouts', (req, res) => {
  res.sendFile(__dirname + '/views/workouts.html');
})

app.get('/insert', (req, res) => {
  res.sendFile(__dirname + '/views/newExerciseLanding.html');
})

app.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
})

const server = http.createServer(app);

server.listen(port, address, () => {
  console.log(`Server is running on localhost:` + port);
});

process.on('exit', () => {
  dbConnection.end();
});
