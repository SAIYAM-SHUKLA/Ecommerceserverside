const express = require('express');
const router = express.Router();
const { registerUser, loginUser,getProfile } = require('../controllers/userController.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

module.exports = router;
