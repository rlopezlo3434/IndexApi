const express = require('express');
const RegistroController = require('../controllers/RegistroController');

const router = express.Router();

// Ruta para registrar un cliente y su inversión
router.post('/registrar', RegistroController.registrarCliente);

router.post('/registrarInversion', RegistroController.registerInversion);

router.post('/registrarAsesor', RegistroController.registerAsesor);

router.post('/actualizarPass', RegistroController.updatePassword);

router.post('/actualizarEstado', RegistroController.updateEstado);

router.post('/actualizarDocumento', RegistroController.updateDocumento);



module.exports = router;
