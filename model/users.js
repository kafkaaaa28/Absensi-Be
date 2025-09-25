const db = require('../config/db.js');

class Users {
  static async CreateUser(userData) {
    const { nama, email, password, role } = userData;
    const [result] = await db.query(
      `INSERT INTO users 
        (nama, email, password, role) 
        VALUES (?, ?, ?, ?)`,
      [nama, email, password, role]
    );
    return { id_user: result.insertId, ...userData };
  }
  static async createSiswa(id_user, userData) {
    const { nim, semester, fakultas, prodi } = userData;
    await db.query(`INSERT INTO siswa (id_user, nim, semester , fakultas ,prodi  ) VALUES (?, ?, ?,?,?)`, [id_user, nim, semester, fakultas, prodi]);
    return { id_user, ...userData };
  }
  static async createDosen(id_user, userData) {
    const { fakultas, prodi } = userData;
    await db.query(`INSERT INTO dosen (id_user, fakultas, prodi) VALUES (?, ?, ?)`, [id_user, fakultas, prodi]);
    return { id_user, ...userData };
  }
  static async FindByEmail(email) {
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
  }
  static async FindById(id_user) {
    const [rows] = await db.query(`SELECT * FROM users WHERE id_user = ?`, [id_user]);
    return rows[0];
  }
  static async getAllSiswa() {
    const [rows] = await db.query(
      `SELECT 
    users.*, 
    siswa.id_siswa, 
    siswa.id_user, 
    siswa.nim, 
    siswa.semester, 
    siswa.prodi, 
    siswa.fakultas
FROM 
    users 
LEFT JOIN 
    siswa ON users.id_user = siswa.id_user 
WHERE 
    users.role = 'siswa'`
    );
    return rows;
  }
  static async getAllDosen() {
    const [rows] = await db.query('SELECT users.*, dosen.* FROM users JOIN dosen ON users.id_user = dosen.id_user');
    return rows;
  }
  static async updateUser(id, Userdata) {
    const { nama, email } = Userdata;
    await db.query(
      `UPDATE users 
        SET nama = ?, email = ?
        WHERE id_user = ?`,
      [nama, email, id]
    );
    return { id, ...Userdata };
  }
  static async updateSiswa(id, Userdata) {
    const { nim, semester } = Userdata;
    await db.query(
      `UPDATE siswa 
        SET nim = ?, semester = ?
        WHERE id_user = ?`,
      [nim, semester, id]
    );
    return { id, ...Userdata };
  }
  static async updateDosen(id, Userdata) {
    const { fakultas, prodi } = Userdata;
    await db.query(
      `UPDATE dosen 
        SET fakultas = ?, prodi = ?
        WHERE id_user = ?`,
      [fakultas, prodi, id]
    );
    return { id, ...Userdata };
  }
  static async deleteUser(id) {
    await db.query('DELETE FROM users WHERE id_user = ?', [id]);
    return true;
  }
  static async getidDosen(id) {
    const [rows] = await db.query('SELECT * FROM dosen WHERE id_user = ?', [id]);
    if (rows.length > 0) {
      return rows[0].id_dosen;
    } else {
      return null;
    }
  }
  static async getidSiswa(id) {
    const [rows] = await db.query('SELECT * FROM siswa WHERE id_user = ?', [id]);
    if (rows.length > 0) {
      return rows[0].id_siswa;
    } else {
      return null;
    }
  }
  static async ProfileSiswa(id) {
    const [rows] = await db.query(
      `SELECT siswa.* , users.nama, users.email, users.role FROM siswa JOIN users ON users.id_user = siswa.id_user
     WHERE siswa.id_user = ?`,
      [id]
    );
    return rows;
  }
}

module.exports = Users;
