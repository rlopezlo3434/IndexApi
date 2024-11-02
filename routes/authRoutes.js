const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', AuthController.login);

module.exports = router;
