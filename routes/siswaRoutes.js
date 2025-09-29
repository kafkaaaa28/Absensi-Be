const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswacontroller.js');
const { authMiddleware, siswaMiddleware } = require('../middleware/middleware.js');

router.get('/jadwalsiswa', authMiddleware, siswaMiddleware, siswaController.getJadwalSiswa);
router.get('/jadwalharini', authMiddleware, siswaMiddleware, siswaController.getJadwalSiswaHarini);
router.get('/matkulsiswa', authMiddleware, siswaMiddleware, siswaController.getMatkulsiswa);
router.get('/profilesiswa', authMiddleware, siswaMiddleware, siswaController.ProfileSiswa);
router.get('/qrsiswa', authMiddleware, siswaMiddleware, siswaController.getQrcodeSiswa);
router.get('/cek-daftar', authMiddleware, siswaMiddleware, siswaController.CheckFaceDaftar);
router.post('/upload-face', authMiddleware, siswaMiddleware, siswaController.registerFace);

module.exports = router;
