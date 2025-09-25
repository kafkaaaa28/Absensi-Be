const db = require('../config/db');

class Dosen {
  static async jadwalDosenbyid(id) {
    const [rows] = await db.query(
      `SELECT jadwal_matkul.*, kelas_siswa.*, matkul.id_matkul, matkul.nama_matkul, matkul.kode_matkul, dosen.id_dosen
       FROM jadwal_matkul
       LEFT JOIN kelas_siswa ON jadwal_matkul.id_kelas = kelas_siswa.id_kelas
       LEFT JOIN matkul ON kelas_siswa.id_matkul = matkul.id_matkul
       LEFT JOIN dosen ON kelas_siswa.id_dosen = dosen.id_dosen
       WHERE dosen.id_dosen = ?`,
      [id]
    );
    return rows;
  }
  static async jadwalDosenharini(id, hari) {
    const [rows] = await db.query(
      `SELECT jadwal_matkul.*, kelas_siswa.*, matkul.id_matkul, matkul.nama_matkul, matkul.kode_matkul, dosen.id_dosen
       FROM jadwal_matkul
       LEFT JOIN kelas_siswa ON jadwal_matkul.id_kelas = kelas_siswa.id_kelas
       LEFT JOIN matkul ON kelas_siswa.id_matkul = matkul.id_matkul
       LEFT JOIN dosen ON kelas_siswa.id_dosen = dosen.id_dosen
       WHERE dosen.id_dosen = ? AND
       jadwal_matkul.hari = ?`,
      [id, hari]
    );
    return rows;
  }
  static async getidDosen(id) {
    const [rows] = await db.query(`SELECT * FROM dosen WHERE id_user = ? `, [id]);
    return rows[0].id_dosen;
  }
  static async getKelasDosen(id) {
    const [rows] = await db.query(
      `SELECT kelas_siswa.id_matkul , kelas_siswa.id_dosen , kelas_siswa.nama_kelas,  matkul.* ,dosen.id_dosen FROM kelas_siswa JOIN matkul ON kelas_siswa.id_matkul = matkul.id_matkul LEFT JOIN dosen ON kelas_siswa.id_dosen = dosen.id_dosen WHERE dosen.id_dosen = ? `,
      [id]
    );
    return rows;
  }

  static async ProfileDosen(id) {
    const [rows] = await db.query(
      `SELECT dosen.*, users.nama, users.email, users.role
     FROM dosen
     JOIN users ON users.id_user = dosen.id_user
     WHERE dosen.id_user = ?`,
      [id]
    );
    return rows;
  }
}

module.exports = Dosen;
