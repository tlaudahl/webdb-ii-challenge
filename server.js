const express = require('express');

const server = express();

const db = require('./data/dbConfig');

server.use(express.json());


server.listen(4000, () => {
    console.log('\n === Server Listening on Port 4000 === \n');
})

server.get('/', (req, res) => {
    db.find()
    .then(cars => res.status(200).json(cars))
    .catch(err => res.status(500).json({ error: "Could not retrive the cars from the database" }))
})

server.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(car => {
        if(car) {
            res.status(200).json(car)
        } else {
            res.status(404).json({ error: "A car with that ID could not be found" })
        }
    })
})

server.post('/', (req, res) => {
    if(!req.body.vin) {

    } else if (!req.body.make) {
        res.status(400).json({ error: "You must provide the vin"})
    } else if (!req.body.model) {
        res.status(400).json({ error: "You must provide a model"})
    } else if (!req.body.mileage) {
        res.status(400).json({ error: "You must provide the mileage"})
    } else {
        db.insert(req.body)
        .then(car => res.status(201).json(car))
        .catch(err => res.status(500).json({ error: "Could not add the car to the database" }))
    }
})