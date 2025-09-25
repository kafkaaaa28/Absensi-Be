const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/usersRoutes.js');
const matkulRoutes = require('./routes/matkulRoutes.js');
const jadwalRoutes = require('./routes/jadwalRoutes.js');
const KelasRoutes = require('./routes/KelasRoutes.js');
const dosenRoutes = require('./routes/dosenRoutes.js');
const siswaRoutes = require('./routes/siswaRoutes.js');
const corsOptions = {
  origin: ['http://192.168.1.16:3000', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/matkul', matkulRoutes);
app.use('/api/jadwal', jadwalRoutes);
app.use('/api/kelas', KelasRoutes);
app.use('/api/dosen', dosenRoutes);
app.use('/api/siswa', siswaRoutes);
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SHOW TABLES');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
