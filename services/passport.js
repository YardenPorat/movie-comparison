const config = require('config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Configuration
const GOOGLE_CLIENT_ID =
    process.env.GOOGLE_CLIENT_ID || config.get('GOOGLE_CLIENT_ID');
const GOOGLE_SECRET_KEY =
    process.env.GOOGLE_SECRET_KEY || config.get('GOOGLE_SECRET_KEY');

passport.serializeUser((user, done) => {
    // console.log(`serialized user id: ${user.id}`);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // console.log(`deserializing: ${id}`);
    user = await User.findById(id);
    if (user) {
        done(null, user);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_SECRET_KEY,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            //searching id in the DB
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                //already have a record with a profile ID
                return done(null, existingUser);
            }

            //id not found, make a new record
            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
);
