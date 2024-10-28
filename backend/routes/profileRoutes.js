const express = require('express');
const ProfileController = require('../controllers/ProfileController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', verifyToken, ProfileController.getProfile); // Get profile
router.put('/:id', verifyToken, ProfileController.updateProfile); // Update profile
router.delete('/:id/photo', verifyToken, ProfileController.deletePhoto); // Delete photo
router.delete('/:id/bio', verifyToken, ProfileController.deleteBio); // Delete bio

module.exports = router;
