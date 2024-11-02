const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.post('/clienteAsesor', ClienteController.getClientesAsesor);
router.post('/clienteDetalle', ClienteController.getCliente);
router.post('/asesores', ClienteController.getListaAsesores);



module.exports = router;
