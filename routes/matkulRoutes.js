const express = require('express');
const router = express.Router();
const MatkulController = require('../controller/matkulcontroller.js');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware.js');
router.post('/', authMiddleware, adminMiddleware, MatkulController.create);
router.get('/', authMiddleware, adminMiddleware, MatkulController.getAll);
router.put('/:id', authMiddleware, adminMiddleware, MatkulController.update);
router.get('/:id', authMiddleware, adminMiddleware, MatkulController.getOne);
router.delete('/:id', authMiddleware, adminMiddleware, MatkulController.delete);

module.exports = router;
