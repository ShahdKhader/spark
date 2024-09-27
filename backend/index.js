const sequelize = require('./database'); 
const User = require('./models/User');

async function initialize() {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await User.sync();
}

initialize();
