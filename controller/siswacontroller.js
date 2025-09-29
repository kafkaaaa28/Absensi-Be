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
      const qrPath = `/qr/${SiswaId}.png`;
      console.log(qrPath);
      res.json({ data: Profile, qr: qrPath });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getQrcodeSiswa: async (req, res) => {
    try {
      const SiswaId = req.user.id;
      const siswa = await Siswa.getqrSiswa(SiswaId);
      const qrUrl = `/qr/${SiswaId}.png`;
      res.json({ data: siswa, qr: qrUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  CheckFaceDaftar: async (req, res) => {
    try {
      const SiswaId = req.user.id;
      const cek = await Siswa.CheckFace(SiswaId);
      if (cek.length > 0 && cek[0].face_embedding) {
        res.json({ hasFace: true });
      } else {
        res.json({ hasFace: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  registerFace: async (req, res) => {
    try {
      const userId = req.user.id;
      const { face_embedding } = req.body;
      console.log(face_embedding);
      if (!face_embedding) {
        return res.status(400).json({ message: 'Face embedding tidak ditemukan' });
      }

      await Siswa.saveFaceEmbedding(userId, req.body);

      res.status(200).json({ message: 'Face embedding berhasil disimpan' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal simpan face embedding' });
    }
  },
};
module.exports = siswaController;
