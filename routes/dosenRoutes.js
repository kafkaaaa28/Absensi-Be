const express = require('express');
const router = express.Router();
const DosenController = require('../controller/dosencontroller.js');
const { authMiddleware, dosenMiddleware } = require('../middleware/middleware.js');

router.get('/jadwaldosen', authMiddleware, dosenMiddleware, DosenController.getjadwaldosenbyid);
router.get('/jadwalharini', authMiddleware, dosenMiddleware, DosenController.getjadwaldosenHarini);
router.get('/siswakelas/:id', authMiddleware, dosenMiddleware, DosenController.getSiswakelas);
router.get('/kelasdosen', authMiddleware, dosenMiddleware, DosenController.getKelas);
router.get('/profiledosen', authMiddleware, dosenMiddleware, DosenController.getProfileDosen);
router.put('/absen/:id', authMiddleware, dosenMiddleware, DosenController.UpdateAbsenSiswa);
module.exports = router;
