'use strict'

const speragent = require('superagent');

const client = require('./client.js')


const location = {}

location.getLocationData = function(city){
    let SQL = 'SELECT * FROM locations WHERE search_query = $1'
    let values = [city]
    return client.query(SQL,values)
       .then(results =>{
           console.log(results)
           if(results.rowCount){return results.rowCount}
           else{
               const url = `https://usl.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json&limit=1`;
               return speragent.get(url)
                  .then(data =>{
                      cacheLocation(city,data.body)
                  })
           }
       })
}

function cacheLocation(city,data){
    const location = new Location(data[0])
    let SQL = 'INSERT INTO locations (search_query,formatted_query,latitude,longitude) VALUES ($1 ,$2,$3,$4) RETURNING *'
    let values = [city,location.formatted_query,location.latitude,location.longitude]
      return client(SQL,values)
         .then(results =>{
             const savedLocation = results.row[0]
             return savedLocation
         })
}

function Location(data){
    this.formatted_query = data.display_name
    this.latitude = data.lat
    this.longitude = data.lon
}

module.exports = location 