const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Obtener todos los eventos
router.get('/', verifyToken, eventController.getAllEvents);

// Obtener un evento por ID
router.get('/:id', verifyToken, eventController.getEventById);

module.exports = router;
