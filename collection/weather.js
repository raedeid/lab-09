'use strict'

const superagent = require('superagent');

module.exports = getWeather

function getWeather(latitude,longitude){
    const url = `http://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${latitude},${longitude}`; 
    return superagent.get(url)
}

function parseWeather(data){
    const weatherSummaries = data.daily.data.map(day =>{
        return new Weather (day)
    })
    return Promise.resolve(weatherSummaries)
}

function Weather(day){
    this.forecast = day.sumary
    this.time = new Date(day.time*100).toString().slice(0,15)
}


