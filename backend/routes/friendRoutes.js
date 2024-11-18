const express = require('express');
const FriendController = require('../controllers/FriendController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', verifyToken, FriendController.addFriend);       // Send friend request
router.post('/accept', verifyToken, FriendController.acceptFriend); // Accept friend request
router.delete('/cancel', verifyToken, FriendController.cancelFriend); // Cancel friend request or remove friend
router.get('/', verifyToken, FriendController.getFriends);          // Get friends and count

module.exports = router;
