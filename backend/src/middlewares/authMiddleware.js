// backend/src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader)
    return res.status(403).json({ message: 'No token proporcionado.' });

  const token = authHeader.split(' ')[1]; 

  if (!token)
    return res.status(403).json({ message: 'No token proporcionado.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: 'Token inválido.', error: err });

    req.userId = decoded.id;
    req.isAdmin = decoded.is_admin;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: 'Acceso denegado. se requieren privilegios de administrador para esta accion.' });
  }
  next();
};
