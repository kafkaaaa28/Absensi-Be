const db = require('../config/db');

class Kelas {
  static async create(data) {
    const { id_matkul, id_dosen, nama_kelas, kapasitas } = data;
    const [result] = await db.query(
      `INSERT INTO kelas_siswa ( id_matkul, id_dosen,nama_kelas, kapasitas)
       VALUES (?, ? ,? ,?)`,
      [id_matkul, id_dosen, nama_kelas, kapasitas]
    );
    return { id_kelas: result.insertId, ...data };
  }
  static async getAllKelas() {
    const [rows] = await db.query(
      `SELECT kelas_siswa.*, matkul.* ,dosen.id_dosen ,dosen.id_user , users.nama , users.id_user
     FROM kelas_siswa
     LEFT JOIN 
    matkul ON kelas_siswa.id_matkul = matkul.id_matkul LEFT JOIN dosen ON kelas_siswa.id_dosen = dosen.id_dosen LEFT JOIN users ON dosen.id_user = users.id_user
`
    );
    return rows;
  }
  static async update(id, data) {
    const { id_matkul, id_dosen, nama_kelas, kapasitas } = data;

    await db.query(
      `UPDATE kelas_siswa 
       SET id_matkul=?, id_dosen=?, nama_kelas=?, kapasitas=?
       WHERE id_kelas=?`,
      [id_matkul, id_dosen, nama_kelas, kapasitas, id]
    );
    return { id_kelas: id, ...data };
  }

  static async delete(id) {
    await db.query('DELETE FROM kelas_siswa WHERE id_kelas=?', [id]);
    return true;
  }
  static async createKelas(data) {
    const { id_siswa, id_kelas } = data;
    try {
      await db.query(`INSERT INTO siswakelas (id_siswa, id_kelas) VALUES (?, ?)`, [id_siswa, id_kelas]);
    } catch (err) {
      throw new Error('Gagal menambahkan siswa ke kelas: ' + err.message);
    }
  }
  static async getKelasSiswa(id_siswa) {
    const [rows] = await db.query(
      `SELECT 
  siswakelas.*, 
  siswa1.id_user AS siswa_id_user,
  kelas_siswa.*, 
  matkul.nama_matkul, 
  matkul.kode_matkul
FROM siswakelas
JOIN siswa AS siswa1 ON siswakelas.id_siswa = siswa1.id_siswa
LEFT JOIN kelas_siswa ON siswakelas.id_kelas = kelas_siswa.id_kelas
LEFT JOIN matkul ON kelas_siswa.id_matkul = matkul.id_matkul
WHERE siswa1.id_siswa = ?`,
      [id_siswa]
    );
    return rows;
  }
  static async CheckKelas() {
    const [rows] = await db.query(`SELECT * FROM siswakelas`);
    return rows;
  }
  static async updateKelas(id, data) {
    const { id_kelas } = data;
    await db.query(
      `UPDATE siswakelas
   SET id_kelas=?
   WHERE id=?`,
      [id_kelas, id]
    );
    return { id, ...data };
  }
  static async deleteKelasSiswa(id) {
    await db.query('DELETE FROM siswakelas WHERE id=?', [id]);
    return true;
  }
  static async getAllSiswaKelas(idKelas) {
    const [rows] = await db.query(
      `SELECT 
       siswakelas.*,
       siswa.id_siswa,
       siswa.nim,
       siswa.fakultas,
       siswa.prodi,
       users.nama,
       users.id_user
     FROM siswakelas
     LEFT JOIN siswa ON siswakelas.id_siswa = siswa.id_siswa
     LEFT JOIN users ON siswa.id_user = users.id_user
     WHERE siswakelas.id_kelas = ?`,
      [idKelas]
    );
    return rows;
  }
}

module.exports = Kelas;
