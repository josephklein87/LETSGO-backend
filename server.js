const express = require('express');
const app = express();
const postgres = require('./postgres.js');
const cors = require('cors');

app.use(express.json());
app.use(express.static('public'))
app.use(cors());

const eventsController = require('./controllers/events.js');
app.use('/events', eventsController);

postgres.connect();

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
})
