const express = require('express');
const HistoricoAsesorController = require('../controllers/HistoricoAsesorController');

const router = express.Router();
// Ruta para agregar un registro al histórico
router.post('/agregarHistorico', HistoricoAsesorController.agregarHistorico);

// Ruta para obtener el histórico de un usuario
router.post('/historicoUsuario', HistoricoAsesorController.obtenerHistorico);

module.exports = router;
