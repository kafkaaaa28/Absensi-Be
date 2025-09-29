const db = require('../config/db');

class Jadwal {
  static async create(data) {
    const { id_kelas, hari, jam_mulai, jam_selesai, ruang } = data;
    const [result] = await db.query(
      `INSERT INTO jadwal_matkul (id_kelas, hari, jam_mulai, jam_selesai, ruang)
       VALUES (?, ?, ?, ?, ?)`,
      [id_kelas, hari, jam_mulai, jam_selesai, ruang]
    );
    return { id_jadwal: result.insertId, ...data };
  }
  static async findByMatkul(id_matkul) {
    const [rows] = await db.query('SELECT * FROM jadwal_matkul WHERE id_matkul = ?', [id_matkul]);
    return rows;
  }
  static async getAlljadwal() {
    const [rows] = await db.query(
      `SELECT jadwal_matkul.*, kelas_siswa.id_kelas , kelas_siswa.id_matkul, kelas_siswa.nama_kelas, matkul.id_matkul, matkul.sks,matkul.nama_matkul, matkul.kode_matkul
     FROM jadwal_matkul
     LEFT JOIN kelas_siswa ON jadwal_matkul.id_kelas = kelas_siswa.id_kelas LEFT JOIN matkul ON kelas_siswa.id_matkul = matkul.id_matkul`
    );
    return rows;
  }
  static async update(id, data) {
    const { id_kelas, hari, jam_mulai, jam_selesai, ruang } = data;
    await db.query(
      `UPDATE jadwal_matkul 
       SET id_kelas=?, hari=?, jam_mulai=?, jam_selesai=?, ruang=? 
       WHERE id_jadwal=?`,
      [id_kelas, hari, jam_mulai, jam_selesai, ruang, id]
    );
    return { id_jadwal: id, ...data };
  }

  static async delete(id) {
    await db.query('DELETE FROM jadwal_matkul WHERE id_jadwal=?', [id]);
    return true;
  }
}

module.exports = Jadwal;
