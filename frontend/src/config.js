require('dotenv').config();

module.exports = {
    TMDB_API_KEY: process.env.REACT_APP_TMDB_API_KEY,
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_URL: 'https://image.tmdb.org/t/p/original'
}