'use strict'

const express = require('express');

const cors = require('cors');

const server = express();

const superagent = require('superagent');
const pg = require('pg')
require('dotenv').config();

const client = require('./collection/client.js')
const location = require('./collection/location.js')
const weather = require('./collection/weather.js')
const events = require('./collection/events.js')
const yelp = require('./collection/yelp.js')
const trails = require('./collection/trails.js')
const movies = require('./collection/movies.js')

const PORT = process.env.PORT || 3300;
server.use(cors());
server.get('/location',locationHandler);
server.get('/weather',weatherHandler);
server.get('/events',eventsHandler);
server.get('/yelp',yelpHandler);
server.get('/trails',trailsHandler);
server.get('/movies',moviesHandler);
client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log('database connected');
        })
    });




server.listen(PORT, () => {
    console.log(' at PORT 3300');
})

server.get('/', (request, response) => {
    response.status(200).send('worked');
})

function locationHandler(req,res){
    const city = req.query.city
    location.getLocationData(city)
       .then(data =>{
           sendJSON(data,res)
       })
}

function weatherHandler(req,res){
    const latitude = req.query
    const longitude = req.query
    weather(latitude,longitude)
       .then(data =>{
           sendJSON(data,res)
       })
}

function eventsHandler(req,res){
    const location = req.query.formatted_query
    events(location)
       .then(data =>{
           sendJSON(data,res)
       })
}


function yelpHandler(req,res){
    const location = req.query.search_query
    yelp(location)
       .then(data =>{
           sendJSON(data,res)
       })
}

function trailsHandler(req,res){
    const latitude = req.query
    const longitude = req.query
    trails(latitude,longitude)
       .then(data =>{
           sendJSON(data,res)
       })
}

function moviesHandler(req,res){
    const location = req.query.search_query
    movies(location)
       .then(data =>{
           sendJSON(data,res)
       })
}

function sendJSON(data,response){
    response.status(200).send(data)
}


server.use('*', (request, response) => {
    response.status(404).send('Sorry, not found');
});

server.use((error, request, response) => {
    response.status(500).send(error);
});







