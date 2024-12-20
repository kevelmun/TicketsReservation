const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Usuario ya existe.' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    const userId = result.insertId;

    // Crear JWT con formato homogéneo
    const payload = {
      id: userId,
      is_admin: false,
      email: email,
      username: username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor.', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const [user] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas.' });
    }

    // Crear JWT con el mismo formato
    const payload = {
      id: user[0].id,
      is_admin: user[0].is_admin,
      email: user[0].email,
      username: user[0].username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor.', error });
  }
};
