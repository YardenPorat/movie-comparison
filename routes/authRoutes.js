const passport = require('passport');
const express = require('express');
const authRoutes = express.Router();

authRoutes.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'], //scope of data from google
    }),
    (req, res) => {
        console.log(`trying to auth`);
    }
);

authRoutes.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/public'); // successful authentication redirect
    }
);

authRoutes.get('/logout', (req, res) => {
    console.log(`logging out`);
    req.logout(); //removes auth cookie, and logs out
    res.redirect('/');
});

authRoutes.get('/current_user', (req, res) => {
    console.log(`>> current user`);
    res.send(req.user);
});

module.exports = authRoutes;
