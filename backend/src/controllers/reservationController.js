const db = require('../db');

exports.makeReservation = async (req, res) => {
  const { event_id, tickets } = req.body;
  const user_id = req.userId;

  // Validar los campos requeridos
  if (!event_id || !tickets) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  if (tickets <= 0) {
    return res.status(400).json({ message: 'La cantidad de tickets debe ser al menos 1.' });
  }

  try {
    // Verificar disponibilidad de tickets
    const [event] = await db.execute('SELECT * FROM events WHERE id = ?', [event_id]);

    if (event.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado.' });
    }

    if (event[0].available_tickets < tickets) {
      return res.status(400).json({ message: 'Tickets insuficientes disponibles.' });
    }

    // Iniciar una transacción para asegurar la consistencia
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Insertar la reservación
      await connection.execute(
        'INSERT INTO reservations (user_id, event_id, tickets) VALUES (?, ?, ?)',
        [user_id, event_id, tickets]
      );

      // Actualizar los tickets disponibles
      await connection.execute(
        'UPDATE events SET available_tickets = available_tickets - ? WHERE id = ?',
        [tickets, event_id]
      );

      await connection.commit();
      res.status(201).json({ message: 'Reservación realizada exitosamente.' });
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la reservación.', error });
  }
};

exports.getUserReservations = async (req, res) => {
  const user_id = req.userId;

  try {
    const [reservations] = await db.execute(
      `SELECT r.id, e.name AS event_name, r.tickets, r.reservation_date
       FROM reservations r
       JOIN events e ON r.event_id = e.id
       WHERE r.user_id = ?`,
      [user_id]
    );

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservaciones.', error });
  }
};
