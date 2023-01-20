const express = require('express');
const router = express.Router();
const postgres = require('../postgres.js');

router.get('/', (req, res) => {
    postgres.query('SELECT * FROM events ORDER BY date ASC;', (err, results) => {
        res.json(results.rows)
    });
});

// MAIN PAGE

router.put('/findCity', (req, res) => {
    console.log(req.body.city1 + req.body.state1)
    postgres.query(`SELECT * FROM events WHERE city='${req.body.city1}' AND state='${req.body.state1}' ORDER BY date ASC;`, (err, results) => {
        res.json(results.rows)
    });
});



// SEARCH BY DATE

router.put('/date', (req, res) => {
    console.log(req.body.city1 + req.body.state1 + req.body.date1)
    postgres.query(`SELECT * FROM events WHERE city='${req.body.city1}' AND state='${req.body.state1}' AND date='${req.body.date1}' ORDER BY date ASC;`, (err, results) => {
        res.json(results.rows)
    });
});

//find user's own submitted events

router.put('/myEvents', (req, res) => {
    console.log("test")
    postgres.query(`SELECT * FROM events WHERE submitted_by='${req.body.thisUser}';`, (err, results) => {
        res.json(results.rows)
    });
});

//find user's saved events
router.put('/savedEvents', (req, res) => {
    console.log("test")
    postgres.query(`SELECT * FROM events INNER JOIN following ON events.id = following.event_id WHERE following.username='${req.body.thisUser}' ORDER BY events.date ASC;`, (err, results) => {
        res.json(results.rows)
    });
});

router.put('/userFavs', (req, res) => {
    postgres.query(`SELECT * FROM following WHERE username = '${req.body.thisUser}';`, (err, results) =>{
        if (err) {
            console.log("There was an error")
        } else {
            console.log(results.rows)
            res.json(results.rows)
        }
    })
});

router.delete('/deleteFav/:thisUser/:thisEvent', (req, res) => {
    postgres.query(`DELETE FROM following WHERE username = '${req.params.thisUser}' AND event_id=${req.params.thisEvent};`, (err, results) => {
        postgres.query(`SELECT * FROM following WHERE username = '${req.params.thisUser}';`, (err, results) => {
            console.log(results.rows)
            res.json(results.rows)
        });
    });
});

//post user's saved events

router.post('/addFav', (req, res) => {
    postgres.query(`INSERT INTO following (username, event_id) 
                    VALUES ('${req.body.thisUser}', '${req.body.thisEvent}');`, (err, results) => {
        postgres.query('SELECT * FROM events ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

//post event



router.post('/', (req, res) => {
    console.log(req.body.name)
    postgres.query(`INSERT INTO events 
                    (name, street, city, state, zip, outdoor, date, time, description, link, dog_friendly, picture, submitted_by) 
                    VALUES ('${req.body.name}', '${req.body.street}', '${req.body.city}', '${req.body.state}',
                    '${req.body.zip}', '${req.body.outdoor}', '${req.body.date}', '${req.body.time}', 
                    '${req.body.description}', '${req.body.link}', '${req.body.dog_friendly}', '${req.body.picture}', '${req.body.submitted_by}');`, (err, results) => {
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
    postgres.query(`UPDATE events SET name = '${req.body.name}', street = '${req.body.street}', city = '${req.body.city}', state = '${req.body.state}',
                                              zip = '${req.body.zip}', outdoor = '${req.body.outdoor}', date = '${req.body.date}', time = '${req.body.time}', 
                                              description = '${req.body.description}', link = '${req.body.link}', dog_friendly = '${req.body.dog_friendly}' 
                                              WHERE id = '${req.params.id}';`, (err, results) => {
        postgres.query('SELECT * FROM events ORDER BY id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});


router.get('/:id', (req, res)=>{
    postgres.query(`SELECT * FROM events WHERE id='${req.params.id}';`, (err, results) => {
        res.json(results.rows)
    })
})


module.exports = router;
