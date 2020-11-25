const express = require('express');
const passport = require('passport');
const movieRoutes = express.Router();
const Movie = require('../models/MovieSchema');
const User = require('../models/UserSchema');
const isLoggedIn = require('../services/isLoggedIn');

movieRoutes.post('/like/:movieId', isLoggedIn, async (req, res) => {
    console.log(`>> like movie`);
    const { movieId } = req.params;
    const userId = req.user._id;
    try {
        const alreadyLiked = await Movie.find({
            _id: movieId,
            likedBy: userId,
        });

        if (alreadyLiked.length > 0) {
            return res.status(400).send('user already liked movie');
        } else {
            const movie = await Movie.updateOne(
                { _id: movieId },
                { $push: { likedBy: userId }, $inc: { likesCount: 1 } }
            ).exec();
        }
        res.status(200).send(`liked successfuly`);
    } catch (err) {
        console.log(err);
    }
});

movieRoutes.get('/get', async (req, res) => {
    console.log(`getting all movies`);
    try {
        const movies = await Movie.find();
        res.send(movies);
    } catch (err) {
        res.status(500).send(err);
    }
});

movieRoutes.post('/add', isLoggedIn, async (req, res) => {
    const { movieName, movieUrl, movieRating } = req.body;
    const newMovie = { movieName, movieUrl, movieRating };
    try {
        const movie = await new Movie(newMovie);
        movie.save();
        res.send(movie);
    } catch (err) {
        console.log(`could not add movie to the DB: ${err}`);
        res.status(500).send(err);
    }
});

module.exports = movieRoutes;
