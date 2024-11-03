const express = require('express');
const cors = require('cors');
const { pool, connectDB } = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Conecta a la base de datos al iniciar el servidor
connectDB();

app.use(cors());

app.get('/patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM patients');
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).send('Error al obtener pacientes');
  }
});

// Ruta para obtener datos de la tabla 'cardio_patients'
app.get('/cardio_patients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.cardio_patients'); //
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).send('Error al obtener pacientes');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
