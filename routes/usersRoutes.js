const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller.js');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware.js');

router.get('/siswa', authMiddleware, adminMiddleware, userController.getAllSiswa);
router.get('/dosen', authMiddleware, adminMiddleware, userController.getAllDosen);
router.post('/createusers', authMiddleware, adminMiddleware, userController.createUser);
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUsers);
router.put('/:id', authMiddleware, adminMiddleware, userController.updateUsers);

module.exports = router;
