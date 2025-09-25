const Siswa = require(`../model/siswa.js`);

const siswaController = {
  getMatkulsiswa: async (req, res) => {
    try {
      const SiswaId = req.user.id_siswa;
      const Matkul = await Siswa.MatkulSaya(SiswaId);
      res.json(Matkul);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getJadwalSiswa: async (req, res) => {
    try {
      const SiswaId = req.user.id_siswa;
      const Jadwal = await Siswa.JadwalSiswa(SiswaId);
      res.json(Jadwal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getJadwalSiswaHarini: async (req, res) => {
    try {
      const SiswaId = req.user.id_siswa;

      const hariIni = new Date().toLocaleString('id-ID', { weekday: 'long' });

      const Jadwal = await Siswa.JadwalSiswaHari(SiswaId, hariIni);
      res.json(Jadwal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  ProfileSiswa: async (req, res) => {
    try {
      const SiswaId = req.user.id;
      const Profile = await Siswa.ProfileSiswa(SiswaId);
      res.json(Profile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
};
module.exports = siswaController;
