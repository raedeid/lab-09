'use strict'

const express = require('express');

const cors = require('cors');

const app = express();

const superagent = require('superagent')

require('dotenv').config()

app.use(cors())

const PORT = process.env.PORT || 3300

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY

const EVENTFUL_API_KEY = process.env.EVENTFUL_API_KEY

app.listen(PORT, () =>{
    console.log('listen to ', PORT);
})

app.get('/',(req,res) =>{
    res.status(200).send('its work');
})

app.get('/location', handleLOcation);


function Location(city, locationData) {
    this.formatted_query = locationData[0].display_name;
    this.latitude = locationData[0].lat;
    this.longitude = locationData[0].lon;
    this.search_query = city;
  }

function handleLOcation(req,res){
    // console.log(req)
    let city = req.query['city']
    getDataLocation(city)
       .then(output =>{
           res.send(output)
       })
}

function getDataLocation(para_1){
    const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${para_1}&format=json&limit=1`
    return superagent.get(url)
       .then(data =>{
           console.log(data.body)
            let loc = new Location (para_1,data.body)
            return loc        
       })
}

app.get('/weather', handleWeather)

function Weather(day) {
    this.time = new Date(day.time * 1000).toDateString();
    this.forecast = day.summary;
}

function handleWeather(req,res){
    let lat = req.query['latitude'];
    let log = req.query['longitude'];
    get_weather_data(lat,log)
       .then(data =>{
           res.send(data)
       })
}


function get_weather_data(para_1,para_2){
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${para_1},${para_2}`
    return superagent.get(url)
       .then(output =>{
           let weather = output.body.daily.data.map((day) => new Weather(day))
           return weather
       })

}


