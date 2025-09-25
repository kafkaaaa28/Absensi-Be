const db = require('../config/db');

class Siswa {
  static async MatkulSaya(id) {
    const [rows] = await db.query(
      `SELECT 
       ms.*, 
       m.nama_matkul, 
       m.kode_matkul 
     FROM 
       matkul_siswa ms
     JOIN 
       matkul m ON m.id_matkul = ms.id_matkul
     WHERE 
       ms.id_siswa = ?`,
      [id]
    );
    return rows;
  }

  static async JadwalSiswa(id) {
    const [rows] = await db.query(
      `SELECT 
       jadwal_matkul.*, 
       matkul.*, 
       dosen.id_dosen, 
       users.id_user, 
       users.nama ,
       kelas_siswa.*,
       siswa.id_siswa,
       siswakelas.*
     FROM 
       jadwal_matkul
     JOIN 
       kelas_siswa ON jadwal_matkul.id_kelas = kelas_siswa.id_kelas
    LEFT JOIN 
    matkul ON kelas_siswa.id_matkul = matkul.id_matkul
    LEFT JOIN 
    siswakelas ON kelas_siswa.id_kelas = siswakelas.id_kelas
    LEFT JOIN 
    siswa ON siswakelas.id_siswa = siswa.id_siswa
     LEFT JOIN 
       dosen ON kelas_siswa.id_dosen = dosen.id_dosen
     LEFT JOIN 
       users ON users.id_user = dosen.id_user
     WHERE 
       siswa.id_siswa = ?`,
      [id]
    );
    return rows;
  }
  static async JadwalSiswaHari(id, hari) {
    const [rows] = await db.query(
      `SELECT 
       jadwal_matkul.*, 
       matkul.*, 
       dosen.id_dosen, 
       users.id_user, 
       users.nama ,
       kelas_siswa.*,
       siswa.id_siswa,
       siswakelas.*
     FROM 
       jadwal_matkul
     JOIN 
       kelas_siswa ON jadwal_matkul.id_kelas = kelas_siswa.id_kelas
    LEFT JOIN 
    matkul ON kelas_siswa.id_matkul = matkul.id_matkul
    LEFT JOIN 
    siswakelas ON kelas_siswa.id_kelas = siswakelas.id_kelas
    LEFT JOIN 
    siswa ON siswakelas.id_siswa = siswa.id_siswa
     LEFT JOIN 
       dosen ON kelas_siswa.id_dosen = dosen.id_dosen
     LEFT JOIN 
       users ON users.id_user = dosen.id_user
     WHERE 
       siswa.id_siswa = ? AND jadwal_matkul.hari = ?`,
      [id, hari]
    );
    return rows;
  }
  static async ProfileSiswa(id) {
    const [rows] = await db.query(
      `SELECT siswa.*, users.nama, users.email, users.role
     FROM siswa
     JOIN users ON users.id_user = siswa.id_user
     WHERE siswa.id_user = ?`,
      [id]
    );
    return rows;
  }
}
module.exports = Siswa;
