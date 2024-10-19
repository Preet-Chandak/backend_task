const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const {validate} = require('../middleware/validationMiddleware')

router.post('/register', validate('registerUser'), registerUser);
router.post('/login', validate('loginUser'), loginUser);
router.get('/profile', protect, getUserDetails);

module.exports = router;
