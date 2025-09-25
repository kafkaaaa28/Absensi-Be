const Matkul = require('../model/matkul.js');

const MatkulController = {
  create: async (req, res) => {
    try {
      const newMatkul = await Matkul.create(req.body);
      console.log(req.body);
      res.status(201).json(newMatkul);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Gagal membuat matkul' });
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await Matkul.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: `${err.message} gagal ambil data matkul` });
    }
  },
  getOne: async (req, res) => {
    try {
      const matkul = await Matkul.findById(req.params.id);
      if (!matkul) return res.status(404).json({ error: 'Matkul tidak ditemukan' });
      res.json(matkul);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil matkul' });
    }
  },
  update: async (req, res) => {
    try {
      const updated = await Matkul.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Gagal update matkul' });
    }
  },
  delete: async (req, res) => {
    try {
      await Matkul.delete(req.params.id);
      res.json({ message: 'Matkul dihapus' });
    } catch (err) {
      res.status(500).json({ error: 'Gagal hapus matkul' });
    }
  },
};

module.exports = MatkulController;
