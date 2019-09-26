const express = require('express');
const axios = require('axios');
const app = express();
const makeSwapiAPICall = require('./helper.js')


app.use(express.json());

app.get('/api/people', async (req, res) => {
'https://swapi.co/api/';

    const people = await makeSwapiAPICall('https://swapi.co/api/people');
    res.status(200).send(people)
})


const PORT = 4242;
app.listen(PORT, () => console.log('You are who you choose to be...\nas long as you choose to be port',PORT));