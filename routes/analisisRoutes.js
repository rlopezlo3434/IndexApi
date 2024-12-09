const express = require('express');
const AnalisisController = require('../controllers/AnalisisController');


const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/usersWithInvestments', AnalisisController.getUsersWithInvestments);
router.post('/analisisPie', AnalisisController.getMontosPorEmpresa);
router.post('/analisisNewClientes', AnalisisController.getClientesEnRangoFechas);
router.post('/analisisInversionesPorVencer', AnalisisController.obtenerInversionesPorVencer);
router.post('/analisisInversionesVencidas', AnalisisController.obtenerInversionesVencidas);



module.exports = router;
