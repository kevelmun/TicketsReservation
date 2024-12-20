const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Realizar una reservación
router.post('/', verifyToken, reservationController.makeReservation);

// Obtener reservaciones del usuario
router.get('/', verifyToken, reservationController.getUserReservations);

module.exports = router;
