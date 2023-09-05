const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');

router.get('/:muscleGroup', (req, res) => {
    const muscleGroup = req.params.muscleGroup;
    res.setHeader('Content-Type', 'application/json');
    const query = 'SELECT name, muscleGroup, exerciseLink FROM workouts WHERE muscleGroup = ?';
    
    dbConnection.query(query, [muscleGroup], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send('Database error');
            return;
        }
        
        res.status(200).json(results);
    });
});

router.post('/add', (req, res) => {
    const { name, muscleGroup, exerciseLink } = req.body;

    const insertQuery = 'INSERT INTO workouts (name, muscleGroup, exerciseLink) VALUES (?, ?, ?)';
    
    dbConnection.query(insertQuery, [name, muscleGroup, exerciseLink], (error) => {
        if (error) {
            console.error('Database insert error:', error);
            res.status(500).send('Database error');
            return;
        }

        res.status(201).send('Workout added successfully');
    });
});

router.delete('/:id', (req, res) => {
    const workoutId = req.params.id;

    const deleteQuery = 'DELETE FROM workouts WHERE id = ?';

    dbConnection.query(deleteQuery, [workoutId], (error) => {
        if (error) {
            console.error('Database delete error:', error);
            res.status(500).send('Database error');
            return;
        }

        res.status(200).send('Workout deleted successfully');
    });
});

module.exports = router;