const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User (Signup)
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const user = await User.create({ username, email, password });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error(err);
        const errorMessage = err.errors ? err.errors.map(e => e.message).join(', ') : 'An error occurred while registering the user.';
        res.status(500).json({ error: errorMessage });
    }
};

// Signin User (Login)
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found. Please check your email and try again.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password. Please try again.' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred during signin. Please try again later.' });
    }
};


// Change Password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    let token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    // Remove 'Bearer ' from the token string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('Error in changePassword:', err);
        res.status(500).json({ error: 'An error occurred while changing the password' });
    }
};
