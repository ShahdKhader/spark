const express = require('express');
const ProfileController = require('../controllers/ProfileController');  // Make sure this path is correct
const { verifyToken } = require('../middleware/authMiddleware');  // Assuming you're using JWT for authentication

const router = express.Router();

router.get('/', verifyToken, ProfileController.getProfile);               // Get profile
router.put('/photo', verifyToken, ProfileController.editPhoto);           // Edit photo
router.put('/name', verifyToken, ProfileController.editName);             // Edit name (username)
router.put('/bio', verifyToken, ProfileController.editBio);               // Edit bio
router.put('/skills', verifyToken, ProfileController.editSkills);         // Edit skills
router.delete('/photo', verifyToken, ProfileController.deletePhoto);      // Delete photo
router.delete('/bio', verifyToken, ProfileController.deleteBio);          // Delete bio

module.exports = router;
