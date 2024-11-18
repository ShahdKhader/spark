const User = require('../models/User');
const Friend = require('../models/Friend');
const { Op } = require('sequelize');
// Add a Friend (Send Friend Request)
exports.addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const user = await User.findByPk(req.userId);
        const friend = await User.findByPk(friendId);
        
        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        // Check if the request already exists
        const existingRequest = await Friend.findOne({
            where: { userId: req.userId, friendId: friendId }
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' });
        }

        // Create a new friend request
        await Friend.create({ userId: req.userId, friendId: friendId, status: 'pending' });

        res.json({ message: 'Friend request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending friend request', error });
    }
};

// Accept Friend Request (Accept the pending request)
exports.acceptFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const friendRequest = await Friend.findOne({
            where: { userId: friendId, friendId: req.userId, status: 'pending' }
        });

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        // Accept the friend request
        friendRequest.status = 'accepted';
        await friendRequest.save();

        res.json({ message: 'Friend request accepted' });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting friend request', error });
    }
};

// Cancel Friend (Remove Friend)
exports.cancelFriend = async (req, res) => {
    try {
        const { friendId } = req.body;

        const friend = await Friend.findOne({
            where: {
                [Op.or]: [
                    { userId: req.userId, friendId: friendId },
                    { userId: friendId, friendId: req.userId }
                ]
            }
        });

        if (!friend) {
            return res.status(404).json({ message: 'Friendship not found' });
        }

        // Remove friendship
        await friend.destroy();
        res.json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error('Error in cancelFriend:', error); // Log the error
        res.status(500).json({ message: 'Error removing friend', error });
    }
};

// Get Friends List - Simple Approach
exports.getFriends = async (req, res) => {
    try {
        // Find friends where either userId or friendId is the current user and status is 'accepted'
        const friends = await Friend.findAll({
            where: {
                [Op.or]: [
                    { userId: req.userId, status: 'accepted' },
                    { friendId: req.userId, status: 'accepted' }
                ]
            }
        });

        // Get the user details for each friend relationship
        const friendList = await Promise.all(
            friends.map(async (friend) => {
                // If the current user is userId, get friendId details
                if (friend.userId === req.userId) {
                    const friendData = await User.findByPk(friend.friendId, {
                        attributes: ['id', 'username', 'photo']
                    });
                    return friendData;
                } else {
                    // If the current user is friendId, get userId details
                    const friendData = await User.findByPk(friend.userId, {
                        attributes: ['id', 'username', 'photo']
                    });
                    return friendData;
                }
            })
        );

        res.json({ friends: friendList, count: friendList.length });
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ message: 'Error fetching friends', error });
    }
};