const express = require('express');
const router = express.Router();
const JadwalController = require('../controller/jadwalcontroller');
const { authMiddleware, adminMiddleware, dosenMiddleware } = require('../middleware/middleware.js');

router.post('/', authMiddleware, adminMiddleware, JadwalController.create);
router.get('/:id_matkul', authMiddleware, adminMiddleware, JadwalController.getByMatkul);
router.get('/', authMiddleware, adminMiddleware, JadwalController.getjadwal);
router.put('/:id', authMiddleware, adminMiddleware, JadwalController.update);
router.delete('/:id', authMiddleware, adminMiddleware, JadwalController.delete);

module.exports = router;
