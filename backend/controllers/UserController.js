const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
}