const express = require('express');
const router = express.Router();
const Kelascontroller = require('../controller/kelasController.js');
const { authMiddleware, adminMiddleware } = require('../middleware/middleware.js');
router.post('/', authMiddleware, adminMiddleware, Kelascontroller.create);
router.post('/siswa', authMiddleware, adminMiddleware, Kelascontroller.createKelasSiswa);
router.get('/', authMiddleware, adminMiddleware, Kelascontroller.getKelas);
router.get('/kelassiswa/:id', authMiddleware, adminMiddleware, Kelascontroller.getsiswakelas);
router.get('/:id', authMiddleware, adminMiddleware, Kelascontroller.getAllsiswaPerKelas);
router.put('/:id', authMiddleware, adminMiddleware, Kelascontroller.updateKelas);
router.put('/siswa/:id', authMiddleware, adminMiddleware, Kelascontroller.updateKelasSiswa);
router.delete('/:id', authMiddleware, adminMiddleware, Kelascontroller.delete);
router.delete('/siswa/:id', authMiddleware, adminMiddleware, Kelascontroller.deleteSiswaKelas);

module.exports = router;
