'use strict'

const superagent = require('superagent')

module.exports = getMovies ;


function getMovies(location){
    const url = `https://appi.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&query=${location}`;
    return superagent.get(url)
      .then (data => parseMoviesData(data.body))
}

function parseMoviesData(data){
    const movies = data.result.map(movie =>{
        return new Movie(movie)
    })
    return Promise.resolve(movies);
}

function Movie(movie){
    this.tableName = 'movies'
    this.title = movie.title
    this.overview = movie.vote_average
    this.total_votes = movie.vote_count
    this.image_url = 'https://image.tmdb.org/t/p/w500'+ movie.poster_path
    this.popularity = movie.popularity
    this.released_on = movie.release_date
    this.created_at = Date.now()
}
