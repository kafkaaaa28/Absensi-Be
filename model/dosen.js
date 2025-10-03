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
      `SELECT kelas_siswa.id_matkul , kelas_siswa.id_kelas, kelas_siswa.id_dosen , kelas_siswa.nama_kelas,  matkul.* ,dosen.id_dosen FROM kelas_siswa JOIN matkul ON kelas_siswa.id_matkul = matkul.id_matkul LEFT JOIN dosen ON kelas_siswa.id_dosen = dosen.id_dosen WHERE dosen.id_dosen = ? `,
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
  static async getSiswaPerkelas(id_kelas, id_dosen) {
    const [rows] = await db.query(
      `
      SELECT 
  siswakelas.*, 
  kelas_siswa.id_dosen, 
  kelas_siswa.id_kelas, 
  siswa.id_siswa, 
  siswa.id_user, 
  siswa.nim, 
  siswa.semester, 
  users.id_user AS user_id, 
  users.nama
FROM siswakelas
JOIN kelas_siswa ON siswakelas.id_kelas = kelas_siswa.id_kelas
LEFT JOIN siswa ON siswakelas.id_siswa = siswa.id_siswa
LEFT JOIN users ON siswa.id_user = users.id_user
WHERE siswakelas.id_kelas = ? AND kelas_siswa.id_dosen = ? `,
      [id_kelas, id_dosen]
    );
    return rows;
  }
  static async UpdateAbsen(id, data) {
    const { status, method } = data;
    await db.query(`UPDATE absensi SET status = ?, SET method = ? WHERE id_absen = ?`, [status, id]);
    return { id_absen: id, ...data };
  }
  static async bukaAbsen(data) {
    const { id_siswa, idKelas, jadwalId } = data;
    const [result] = await db.query(
      `INSERT INTO absensi (id_siswa, id_kelas, id_jadwal, status)
         VALUES (?, ?, ?, 'alpha')
         ON DUPLICATE KEY UPDATE status = 'alpha'`,
      [id_siswa, idKelas, jadwalId]
    );
    return { id_absen: result.insertId, ...data };
  }
  static async getSiswaJadwal(id_jadwal) {
    const [rows] = await db.query(
      `SELECT absensi.*, users.id_user, users.nama, siswa.id_siswa, siswa.id_user
       FROM absensi
       JOIN siswa ON absensi.id_siswa = siswa.id_siswa
       LEFT JOIN users ON siswa.id_user = users.id_user
       WHERE absensi.id_jadwal = ?`,
      [id_jadwal]
    );
    return rows;
  }
}

module.exports = Dosen;
