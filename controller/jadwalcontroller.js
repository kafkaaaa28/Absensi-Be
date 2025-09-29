const Jadwal = require('../model/jadwal');
const Users = require('../model/users');

const JadwalController = {
  create: async (req, res) => {
    try {
      const { id_kelas, hari, jam_mulai, ruang, sks } = req.body;
      const tambahMenit = (waktu, menitTambah) => {
        const [jam, menit] = waktu.split(':').map(Number);
        const totalMenit = jam * 60 + menit + menitTambah;
        const jamBaru = Math.floor(totalMenit / 60) % 24;
        const menitBaru = totalMenit % 60;
        return `${String(jamBaru).padStart(2, '0')}:${String(menitBaru).padStart(2, '0')}`;
      };
      const waktuBaru = tambahMenit(jam_mulai, sks * 50);

      const newJadwal = await Jadwal.create({
        id_kelas,
        hari,
        jam_mulai,
        jam_selesai: waktuBaru,
        ruang,
      });
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
      const { id_kelas, hari, jam_mulai, ruang, sks } = req.body;
      const tambahMenit = (waktu, menitTambah) => {
        if (!waktu || !waktu.includes(':')) {
          throw new Error('Format waktu tidak valid');
        }
        const [jamStr, menitStr] = waktu.split(':');
        const jam = Number(jamStr);
        const menit = Number(menitStr);
        if (isNaN(jam) || isNaN(menit)) {
          throw new Error('Waktu tidak dalam format yang benar');
        }
        const totalMenit = jam * 60 + menit + menitTambah;
        const jamBaru = Math.floor(totalMenit / 60) % 24;
        const menitBaru = totalMenit % 60;
        return `${String(jamBaru).padStart(2, '0')}:${String(menitBaru).padStart(2, '0')}`;
      };
      const waktuBaru = tambahMenit(jam_mulai, sks * 50);
      const updated = await Jadwal.update(req.params.id, { id_kelas, hari, jam_mulai, jam_selesai: waktuBaru, ruang });
      console.log(updated);
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
