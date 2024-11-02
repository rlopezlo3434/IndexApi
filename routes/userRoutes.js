const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', UserController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/users/:id', UserController.getUserById);

router.post('/asesor', UserController.getUsersByAsesor);


module.exports = router;
