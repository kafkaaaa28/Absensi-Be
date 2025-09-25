const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswacontroller.js');
const { authMiddleware, siswaMiddleware } = require('../middleware/middleware.js');

router.get('/jadwalsiswa', authMiddleware, siswaMiddleware, siswaController.getJadwalSiswa);
router.get('/jadwalharini', authMiddleware, siswaMiddleware, siswaController.getJadwalSiswaHarini);
router.get('/matkulsiswa', authMiddleware, siswaMiddleware, siswaController.getMatkulsiswa);
router.get('/profilesiswa', authMiddleware, siswaMiddleware, siswaController.ProfileSiswa);

module.exports = router;
