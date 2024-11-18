const express = require('express');
const UserController = require('../controllers/UserController');
const passport = require('../googleAuth'); 
const { validateRegistration } = require('../middleware/validateUser');

const router = express.Router();

// User Registration and Login
router.post('/signup', validateRegistration, UserController.register);
router.post('/signin', UserController.signin);
router.put('/changePassword', UserController.changePassword); 

// Google Login Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.json({
      message: 'Google login successful',
      token: req.user.token,
      user: req.user.user
    });
  }
);

module.exports = router;
