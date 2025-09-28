const db = require('../config/db');

class Matkul {
  static async create(data) {
    const { nama_matkul, semester, sks, kode_matkul } = data;
    const [result] = await db.query(
      `INSERT INTO matkul (nama_matkul,  semester, sks, kode_matkul)
       VALUES (?,?,? ,?)`,
      [nama_matkul, semester, sks, kode_matkul]
    );
    return { id_matkul: result.insertId, ...data };
  }
  static async findAll() {
    const [rows] = await db.query(`SELECT * FROM matkul`);
    return rows;
  }
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM matkul WHERE id_matkul = ?', [id]);
    return rows[0];
  }
  static async update(id, data) {
    const { nama_matkul, semester, sks, kode_matkul } = data;
    await db.query(
      `UPDATE matkul 
       SET nama_matkul=?,  semester=?, sks=? ,  kode_matkul=? 
       WHERE id_matkul=?`,
      [nama_matkul, semester, sks, kode_matkul, id]
    );
    return { id_matkul: id, ...data };
  }
  static async delete(id) {
    await db.query('DELETE FROM matkul WHERE id_matkul=?', [id]);
    return true;
  }
  static async creatematkulsiswa(data) {
    const { id_siswa, id_matkul } = data;
    const [result] = await db.query(`INSERT INTO matkul_siswa (id_siswa ,id_matkul) VALUES (? ,?)`, [id_siswa, id_matkul]);
    return { id: result.insertId, ...data };
  }
}
module.exports = Matkul;
