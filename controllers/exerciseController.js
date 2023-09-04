const express = require('express');
const router = express.Router();
const dbConnection = require('../dbConnection');

router.get('/workouts/:muscleGroup', (req, res) => {
    const muscleGroup = req.params.muscleGroup;
    
    const query = 'SELECT name, muscleGroup, imageSource FROM workouts WHERE muscleGroup = ?';
    
    dbConnection.query(query, [muscleGroup], (error) => {
        if (error) {
            console.error('Database query error:', error);
            res.status(500).send('Database error');
            return;
        }

        res.status(200).send("Workout fetch successful");
    });
});

router.post('/workouts', (req, res) => {
    const { name, muscleGroup, imageSource } = req.body;

    const insertQuery = 'INSERT INTO workouts (name, muscleGroup, imageSource) VALUES (?, ?, ?)';
    
    dbConnection.query(insertQuery, [name, muscleGroup, imageSource], (error) => {
        if (error) {
            console.error('Database insert error:', error);
            res.status(500).send('Database error');
            return;
        }

        res.status(201).send('Workout added successfully');
    });
});

router.delete('/workouts/:id', (req, res) => {
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