const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Ruta para agregar un nuevo evento (solo admin)
router.post('/', verifyToken, isAdmin, eventController.addEvent);

// Ruta para actualizar un evento (solo admin) 
router.put('/:id', verifyToken, isAdmin, eventController.updateEvent);

// Ruta para eliminar un evento (solo admin)
router.delete('/:id', verifyToken, isAdmin, eventController.deleteEvent);

module.exports = router;
