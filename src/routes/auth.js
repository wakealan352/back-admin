const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Validaciones
const validateLogin = [
  body('username').trim().notEmpty().withMessage('El usuario es requerido'),
  body('password').trim().notEmpty().withMessage('La contraseña es requerida')
];

router.post('/login', validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;
    const user = await Usuario.findByUsername(username);

    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

router.put('/cambiar-password', auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await Usuario.findByUsername(req.user.username);

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ mensaje: 'Contraseña actual incorrecta' });
    }

    await Usuario.updatePassword(user.id, newPassword);
    res.json({ mensaje: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar la contraseña' });
  }
});

module.exports = router;