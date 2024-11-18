const User = require('../models/User');
const Skill = require('../models/Skill');

// Get full profile (photo, bio, username, and skills) by ID
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: Skill  // Include associated skills
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json({
            username: user.username,
            photo: user.photo,
            bio: user.bio,
            skills: user.Skills.map(skill => skill.skill_name)  // Map the skill names
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

// Edit profile photo
exports.editPhoto = async (req, res) => {
    try {
        const { photo } = req.body;
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.photo = photo || user.photo;
        await user.save();

        res.json({
            username: user.username,
            photo: user.photo,
            message: 'Profile photo updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating photo', error });
    }
};

// Edit profile name (username)
exports.editName = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = username || user.username;
        await user.save();

        res.json({
            username: user.username,
            message: 'Username updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating username', error });
    }
};

// Edit profile bio
exports.editBio = async (req, res) => {
    try {
        const { bio } = req.body;
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.bio = bio || user.bio;
        await user.save();

        res.json({
            username: user.username,
            bio: user.bio,
            message: 'Profile bio updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating bio', error });
    }
};

// Edit profile skills (update all skills at once)
exports.editSkills = async (req, res) => {
    try {
        const { skills } = req.body;
        const user = await User.findByPk(req.userId, {
            include: Skill
        });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Fetch the current skills from the user's profile
        const currentSkills = user.Skills.map(skill => skill.skill_name);

        // Find the skills to add and the skills to remove
        const skillsToRemove = currentSkills.filter(skill => !skills.includes(skill));
        const skillsToAdd = skills.filter(skill => !currentSkills.includes(skill));

        // Remove the skills that are no longer in the user's skill set
        if (skillsToRemove.length > 0) {
            const skillsToRemoveInstances = await Skill.findAll({
                where: { skill_name: skillsToRemove }
            });
            await user.removeSkills(skillsToRemoveInstances);
        }

        // Add the new skills that were provided in the request
        if (skillsToAdd.length > 0) {
            const skillsToAddInstances = await Skill.findAll({
                where: { skill_name: skillsToAdd }
            });
            await user.addSkills(skillsToAddInstances);
        }

        // Fetch the updated skills
        const updatedUser = await User.findByPk(req.userId, {
            include: Skill
        });

        res.json({
            username: updatedUser.username,
            skills: updatedUser.Skills.map(skill => skill.skill_name),
            message: 'Profile skills updated successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating skills', error });
    }
};



// Delete profile photo
exports.deletePhoto = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
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

// Delete profile bio
exports.deleteBio = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
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
