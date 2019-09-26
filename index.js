const express = require('express');
const app = express();
const {getAll, makeSwapiAPICall, sort} = require('./helper.js')


app.use(express.json());

app.get('/api/people', async (req, res) => {
    try {
        let people = await getAll('https://swapi.co/api/people');
        const sortOptions = ['name', 'height', 'mass'];
        if(req.query.sortBy && sortOptions.includes(req.query.sortBy)) {
            people = sort(people, req.query.sortBy);
        }
        res.status(200).send(people)
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
})

app.get('/api/planets', async (req, res) => {
    try {
        let planets = await getAll('https://swapi.co/api/planets');
        for(let i = 0; i < planets.length; i++) {
            const {residents} = planets[i];
            let residentsNames = [];
            if(residents.length > 0) {
                for(let f = 0; f < residents.length; f++) {
                    let resident = await makeSwapiAPICall('get', residents[f]);
                    residentsNames.push(resident.name);
                }
            }
            planets[i].residents = residentsNames;
        }
        res.status(200).send(planets)
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
    
})


const PORT = 4242;
app.listen(PORT, () => console.log(`Port ${PORT}? It's a trap!`));