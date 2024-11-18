const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const profileRouter = require('./routes/profileRoutes'); 
const friendRoutes = require('./routes/friendRoutes');
const passport = require('./googleAuth'); 
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Use SESSION_SECRET from .env file
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport for OAuth and session handling
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', userRoutes);
app.use('/profile', profileRouter); 
app.use('/api/friends', friendRoutes);

// Database sync and server start
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Tables synced...');
    })
    .catch(err => {
        console.log('Error: ' + err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
