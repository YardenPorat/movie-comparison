const express = require('express');
const cors = require('cors');
const config = require('config');
const cookieSession = require('cookie-session'); // cookie session management package
const passport = require('passport');
const mongoose = require('mongoose');
const moviesRoutes = require('./routes/moviesRoutes');
const authRoutes = require('./routes/authRoutes');

// Init server
const app = express();

// DB Schemas
const moviesSchema = require('./models/MovieSchema');
const usersSchema = require('./models/UserSchema');
require('./services/passport');

// Configuration
MONGO_URI = process.env.MONGO_URI || config.get('MONGO_URI');
PORT = process.env.PORT || config.get('PORT');
COOKIE_KEY = process.env.COOKIE_KEY || config.get('cookieKey');

// Middleware
app.use(cors());

// Passport.js
app.use(express.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        keys: [COOKIE_KEY],
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport.js');

// Mongo connect
(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (err) {
        console.log(`error conntecting to mongodb: ${err}`);
    }
})();

mongoose.connection.once('open', () => {
    console.log(`MongoDB connected`);
});

// Routes
app.use('/movies', moviesRoutes);
app.use('/auth', authRoutes);

// Production settings (serve static files and index.html)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Express server started`);
});
