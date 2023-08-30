const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const app = express();
require('dotenv').config();
const router = express.Router();
const port = process.env.PORT || 3000;
const dbConnection = require('./dbConnection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT id, username, password FROM users WHERE username = ?';
        dbConnection.query(query, [username], async (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                res.status(500).send('Database error');
                return;
            }

            if (results.length === 0) {
                res.status(401).send('Invalid credentials');
                return;
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.status(200).send('Authentication successful');
            } else {
                res.status(401).send('Invalid credentials');
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Authentication error');
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const usernameExistsQuery = 'SELECT id FROM users WHERE username = ?';
        dbConnection.query(usernameExistsQuery, [username], async (error, results) => {
            if (error) {
                console.error('Database query error:', error);
                res.status(500).send('Database error');
                return;
            }

            if (results.length > 0) {
                res.status(400).send('Username already exists');
                return;
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const insertUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
            dbConnection.query(insertUserQuery, [username, hashedPassword], (insertError) => {
                if (insertError) {
                    console.error('Database insert error:', insertError);
                    res.status(500).send('Database error');
                } else {
                    res.status(201).send('User registered successfully');
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Registration error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('exit', () => {
    dbConnection.end();
});

module.exports = router; 
