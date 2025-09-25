const express = require('express');
const router = express.Router();
const authController = require('../controller/authcontroller.js');
const { authMiddleware } = require('../middleware/middleware.js');

router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getMe);
module.exports = router;
