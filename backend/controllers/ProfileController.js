const User = require('../models/User');

// Get profile (photo, bio, and username) by ID
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);  // Use req.userId from the middleware
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json({
            username: user.username,
            photo: user.photo,
            bio: user.bio
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

// Update profile (photo, bio, and username)
exports.updateProfile = async (req, res) => {
    try {
        const { photo, bio } = req.body;
        const user = await User.findByPk(req.userId);  // Use req.userId from the middleware
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.photo = photo || user.photo;
        user.bio = bio || user.bio;

        await user.save();
        res.json({
            username: user.username,
            photo: user.photo,
            bio: user.bio,
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

// Delete only the photo (returning username)
exports.deletePhoto = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);  // Use req.userId from the middleware
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.photo = null;
        await user.save();

        res.json({
            username: user.username,
            message: 'Profile photo deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting photo', error });
    }
};

// Delete only the bio (returning username)
exports.deleteBio = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);  // Use req.userId from the middleware
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.bio = null;
        await user.save();

        res.json({
            username: user.username,
            message: 'Profile bio deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bio', error });
    }
};
