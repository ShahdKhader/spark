const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const userRoutes = require('./routes/userRoutes');
const profileRouter = require('./routes/profileRoutes'); 
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/profile', profileRouter); 

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
