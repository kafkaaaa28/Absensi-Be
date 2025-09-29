const jwt = require('jsonwebtoken');
const users = require('../model/users.js');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
const usercontroller = {
  createUser: async (req, res) => {
    try {
      const { nama, email, password, role, nim, semester, fakultas, prodi } = req.body;
      const existingUser = await users.FindByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Pengguna sudah ada' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await users.CreateUser({
        nama,
        email,
        password: hashedPassword,
        role,
      });
      if (role === 'siswa') {
        if (!nim || !semester) {
          return res.status(400).json({ message: 'NIM dan semester harus diisi untuk role siswa' });
        }
        const qr_code = uuidv4();
        const qrDir = path.join(__dirname, '../public/qr');
        if (!fs.existsSync(qrDir)) fs.mkdirSync(qrDir, { recursive: true });

        const qrPath = path.join(qrDir, `${user.id_user}.png`);
        await QRCode.toFile(qrPath, qr_code);
        await users.createSiswa(user.id_user, {
          id_user: user.id_user,
          nim,
          semester,
          fakultas,
          prodi,
          qr_code,
        });
      }
      if (role === 'dosen') {
        await users.createDosen(user.id_user, {
          id_user: user.id_user,
          fakultas,
          prodi,
        });
      }
      res.status(201).json({
        message: 'User berhasil ditambahkan',
        status: true,
        user: {
          id: user.id,
          nama: user.nama,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const { id } = req.params;
      const qrFilePath = path.join(__dirname, '../public/qr', `${id}.png`);

      fs.unlink(qrFilePath, (err) => {
        if (err) {
          console.error(`Gagal menghapus file QR untuk user ${id}:`, err);
        }
      });

      await users.deleteUser(id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  updateUsers: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama, email, role, nim, semester, fakultas, prodi } = req.body;

      await users.updateUser(id, { nama, email, role });

      if (role === 'siswa') {
        await users.updateSiswa(id, { nim, semester });
      } else if (role === 'dosen') {
        await users.updateDosen(id, { fakultas, prodi });
      }

      res.status(200).json({ message: 'Data berhasil diperbarui' });
    } catch (err) {
      res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
    }
  },
  getAllSiswa: async (req, res) => {
    try {
      const user = await users.getAllSiswa();
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAllDosen: async (req, res) => {
    try {
      const dosen = await users.getAllDosen();
      res.json(dosen);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
module.exports = usercontroller;
