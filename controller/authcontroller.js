const jwt = require('jsonwebtoken');
const users = require('../model/users.js');
const bcrypt = require('bcryptjs');
const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await users.FindByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'email atau password salah' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'email atau password salah' });
      }

      const payload = {
        id: user.id_user,
        email: user.email,
        role: user.role,
      };
      const idDosen = await users.getidDosen(user.id_user);
      if (user.role === 'dosen') {
        payload.id_dosen = idDosen;
      }
      const idSiswa = await users.getidSiswa(user.id_user);
      if (user.role === 'siswa') {
        payload.id_siswa = idSiswa;
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({
        success: true,
        token,
        user: {
          id: user.id_user,
          nama: user.nama,
          email: user.email,
          role: user.role,
          ...(user.role === 'dosen' && { id_dosen: idDosen }),
          ...(user.role === 'siswa' && { id_siswa: idSiswa }),
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },
  getMe: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
      const user = await users.FindByEmail(req.user.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const responseUser = {
        id: user.id_user,
        nama: user.nama,
        email: user.email,
        role: user.role,
      };
      res.json(responseUser);
    } catch (err) {
      console.error('❌ Error getMe:', err.message);
      res.status(500).json({ message: err.message });
    }
  },
};
module.exports = authController;
