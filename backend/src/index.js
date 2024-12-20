const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const reservationRoutes = require('./routes/reservations');
const adminEventRoutes = require('./routes/adminEvents'); // Importa las rutas de admin

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin/events', adminEventRoutes); // Ruta para administrar eventos

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Reserva de Tickets');
});

const PORT = process.env.BACK_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
