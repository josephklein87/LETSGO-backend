const express = require('express');
const router = express.Router();
const postgres = require('../postgres.js');

router.get('/', (req, res) => {
    postgres.query('SELECT * FROM events ORDER BY id ASC;', (err, results) => {
        res.json(results.rows)
    });
});

router.post('/', (req, res) => {
    postgres.query(`INSERT INTO events 
                    (name, street, city, state, zip, outdoor, date, time, description, link, dog_friendly) 
                    VALUES ('${req.body.name}', ${req.body.street}, ${req.body.city}, ${req.body.state},
                    ${req.body.zip}, ${req.body.outdoor}, ${req.body.date}, ${req.body.time}, 
                    ${req.body.description}, ${req.body.link}, ${req.body.dog_friendly})`, (err, results) => {
        postgres.query('SELECT * FROM events ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

router.delete('/:id', (req, res) => {
    postgres.query(`DELETE FROM events WHERE id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM events ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    });
});

router.put('/:id', (req, res) => {
    postgres.query(`UPDATE events SET name = '${req.body.name}', street = ${req.body.street}, city = ${req.body.city}, state =${req.body.state},
                                              zip = ${req.body.zip}, outdoor = ${req.body.outdoor}, date = ${req.body.date}, time = ${req.body.time}, 
                                              description = ${req.body.description}, link = ${req.body.link}, dog_friendly = ${req.body.dog_friendly} 
                                              WHERE id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM events ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

module.exports = router;
