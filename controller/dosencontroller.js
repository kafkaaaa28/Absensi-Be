const jwt = require('jsonwebtoken');
const Dosen = require('../model/dosen.js');
const bcrypt = require('bcryptjs');
const dosenController = {
  getjadwaldosenbyid: async (req, res) => {
    try {
      const DosenId = req.user.id_dosen;
      const jadwalDosen = await Dosen.jadwalDosenbyid(DosenId);
      if (!jadwalDosen) {
        return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
      }
      res.json(jadwalDosen);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getjadwaldosenHarini: async (req, res) => {
    try {
      const DosenId = req.user.id_dosen;
      const hariIni = new Date().toLocaleString('id-ID', { weekday: 'long' });

      const jadwalDosen = await Dosen.jadwalDosenharini(DosenId, hariIni);
      if (!jadwalDosen) {
        return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
      }
      res.json(jadwalDosen);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getProfileDosen: async (req, res) => {
    try {
      const DosenId = req.user.id;
      const Profile = await Dosen.ProfileDosen(DosenId);
      res.json(Profile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getKelas: async (req, res) => {
    try {
      const DosenId = req.user.id_dosen;
      const matkulDosen = await Dosen.getKelasDosen(DosenId);
      if (!matkulDosen) {
        return res.status(404).json({ message: 'Dosen tidak ditemukan' });
      }
      res.json(matkulDosen);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getSiswakelas: async (req, res) => {
    try {
      const { id } = req.params;
      const DosenId = req.user.id_dosen;
      const SiswaKelas = await Dosen.getSiswaPerkelas(id, DosenId);
      res.json(SiswaKelas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  UpdateAbsenSiswa: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const Update = await Dosen.UpdateAbsen(id, { status });
      res.json(Update);
      res.json({ message: 'Status absensi diperbarui' });
    } catch (err) {
      res.status(500).json({ error: 'Gagal update absensi' });
    }
  },
  BukaAbsensi: async (req, res) => {
    try {
      const { idKelas, jadwalId } = req.params;
      const DosenId = req.user.id_dosen;
      const SiswaKelas = await Dosen.getSiswaPerkelas(idKelas, DosenId);
      for (let s of SiswaKelas) {
        await Dosen.bukaAbsen({ id_siswa: s.id_siswa, idKelas, jadwalId });
      }
      res.status(200).json({ message: 'Absensi telah dibuka untuk semua siswa' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getAbsensiKelas: async (req, res) => {
    try {
      const { id } = req.params;
      const get = await Dosen.getSiswaJadwal(id);
      console.log(id);
      res.json(get);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
};
module.exports = dosenController;
