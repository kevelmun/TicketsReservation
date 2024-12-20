const db = require('../db');

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
  try {
    const [events] = await db.execute('SELECT * FROM events');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener eventos.', error });
  }
};

// Obtener un evento por ID 
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const [event] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);

    if (event.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json(event[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el evento.', error });
  }
};

// Agregar un nuevo evento (admin)
exports.addEvent = async (req, res) => {
  const { name, description, date, location, total_tickets } = req.body;

  if (!name || !date || !location || !total_tickets) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO events (name, description, date, location, total_tickets, available_tickets) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, date, location, total_tickets, total_tickets]
    );

    res.status(201).json({ message: 'Evento creado exitosamentee.', eventId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el evento.', error });
  }
};

// Actualizar un evento (admin)
exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, date, location, total_tickets } = req.body;
  
    // Validar los campos requeridos
    if (!name || !date || !location || !total_tickets) {
      return res.status(400).json({ message: 'Faltan campos obligatorio' });
    }
  
    try {
      // Verificar si el evento existe
      const [event] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);
  
      if (event.length === 0) {
        return res.status(404).json({ message: 'Evento no encontrado.' });
      }
  
      // Calcular la diferencia en tickets totales para actualizar los disponibles
      const ticketDifference = total_tickets - event[0].total_tickets;
  
      // Actualizar el evento
      await db.execute(
        'UPDATE events SET name = ?, description = ?, date = ?, location = ?, total_tickets = ?, available_tickets = available_tickets + ? WHERE id = ?',
        [name, description, date, location, total_tickets, ticketDifference, id]
      );
  
      res.json({ message: 'Evento actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el evento.', error });
    }
  };
  

// Eliminar un evento (admin)
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el evento existe
    const [event] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);

    if (event.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    // Eliminar el evento
    await db.execute('DELETE FROM events WHERE id = ?', [id]);

    res.json({ message: 'Evento eliminado exitosamete.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el evento.', error });
  }
};
