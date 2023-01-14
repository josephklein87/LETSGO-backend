const express = require('express')
const users = express.Router()
const bcrypt = require('bcrypt')
const postgres = require('../postgres.js');
  
users.post('/newUser', (req, res) => {
    console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    console.log(req.body.password)
    postgres.query(`INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}');`, (err, results) => {
        if (err) {
            res.json("There was an error")
        } else {
        postgres.query(`SELECT id, username FROM users WHERE username = '${req.body.username}' ORDER BY id ASC;`, (err, results) => {
            res.json(results.rows)
    })};
})
});


users.put('/userLogin', (req, res) => {
    console.log(req.body)
    postgres.query(`SELECT * FROM users WHERE username = '${req.body.username}';`, (err, results) => {
        console.log(results.rows)
        if (err) {
            res.json("There was an error")
        } else if (!results.rows[0]) {
            res.json("User not found")
        } 
        else {
            if (bcrypt.compareSync(req.body.password, results.rows[0].password)) {
                res.json({id: results.rows[0].id, username: results.rows[0].username})
            } else {
                res.json("Password does not match")
            }
        }
});
})  

// users.get('/userList', (req, res) => {
//     User.find({}, (err, foundUser)=>{
//         res.json(foundUser)
//     })
// })
  
module.exports = users