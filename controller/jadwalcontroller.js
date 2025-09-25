const Jadwal = require('../model/jadwal');
const Users = require('../model/users');

const JadwalController = {
  create: async (req, res) => {
    try {
      const newJadwal = await Jadwal.create(req.body);
      res.status(201).json(newJadwal);
    } catch (err) {
      res.status(500).json({ error: `Gagal membuat jadwal ${err.message} ` });
    }
  },
  getByMatkul: async (req, res) => {
    try {
      const jadwal = await Jadwal.findByMatkul(req.params.id_matkul);
      res.json(jadwal);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil jadwal' });
    }
  },
  getjadwal: async (req, res) => {
    try {
      const jadwal = await Jadwal.getAlljadwal();
      res.json(jadwal);
    } catch (err) {
      res.status(500).json({ message: `Gagal mengambil semua jadwal ${err.message} ` });
    }
  },
  update: async (req, res) => {
    try {
      const updated = await Jadwal.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Gagal update jadwal' });
    }
  },
  delete: async (req, res) => {
    try {
      await Jadwal.delete(req.params.id);
      res.json({ message: 'Jadwal dihapus' });
    } catch (err) {
      res.status(500).json({ error: 'Gagal hapus jadwal' });
    }
  },
};
module.exports = JadwalController;
