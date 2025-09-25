const Kelas = require('../model/kelas');
const Matkul = require('../model/matkul');
const Kelascontroller = {
  create: async (req, res) => {
    try {
      const newKelas = await Kelas.create(req.body);
      res.status(201).json(newKelas);
    } catch (err) {
      res.status(500).json({ error: `Gagal membuat kelas ${err.message} ` });
    }
  },
  getKelas: async (req, res) => {
    try {
      const Kelass = await Kelas.getAllKelas();
      res.json(Kelass);
    } catch (err) {
      res.status(500).json({ message: `Gagal mengambil semua Kelas ${err.message}` });
    }
  },
  updateKelas: async (req, res) => {
    try {
      const updated = await Kelas.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Gagal update Kelas ${err.message}` });
    }
  },
  delete: async (req, res) => {
    try {
      await Kelas.delete(req.params.id);
      res.json({ message: 'Kelas dihapus' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Gagal hapus Kelas ${err.message}` });
    }
  },
  createKelasSiswa: async (req, res) => {
    try {
      const { id_kelas, id_siswa, id_matkul } = req.body;
      const allKelasSiswa = await Kelas.CheckKelas();
      console.log(req.body);
      const siswaDiKelas = allKelasSiswa.some((entry) => entry.id_kelas === id_kelas && entry.id_siswa === id_siswa);

      if (siswaDiKelas) {
        return res.status(400).json({ message: 'Siswa telah berada di kelas tersebut.' });
      }
      const kelas = await Kelas.createKelas({
        id_kelas,
        id_siswa,
      });
      await Matkul.creatematkulsiswa({
        id_siswa,
        id_matkul,
      });
      res.status(201).json(kelas);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Gagal Kelas ${err.message}` });
    }
  },
  getsiswakelas: async (req, res) => {
    const { id } = req.params;
    try {
      const Kelass = await Kelas.getKelasSiswa(id);
      res.json(Kelass);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: `Gagal mengambil Kelas dengan id ${id}: ${err.message}` });
    }
  },
  updateKelasSiswa: async (req, res) => {
    try {
      const { id_kelas, id_siswa } = req.body;
      console.log(req.body);
      const allKelasSiswa = await Kelas.CheckKelas();

      const siswaDiKelas = allKelasSiswa.some((entry) => entry.id_kelas === id_kelas && entry.id_siswa === id_siswa);

      if (siswaDiKelas) {
        return res.status(400).json({ message: 'Siswa telah berada di kelas tersebut.' });
      }
      const updated = await Kelas.updateKelas(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Gagal update Kelas ${err.message}` });
    }
  },
  deleteSiswaKelas: async (req, res) => {
    try {
      await Kelas.deleteKelasSiswa(req.params.id);
      res.json({ message: 'Kelas dihapus' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Gagal update Kelas ${err.message}` });
    }
  },
  getAllsiswaPerKelas: async (req, res) => {
    try {
      const { id } = req.params;
      const SiswaKelas = await Kelas.getAllSiswaKelas(id);
      res.json(SiswaKelas);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: `Gagal update Kelas ${err.message}` });
    }
  },
};
module.exports = Kelascontroller;
