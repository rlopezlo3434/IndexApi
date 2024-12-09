const express = require('express');
const EmpresaController = require('../controllers/EmpresasController');

const router = express.Router();

// Ruta para crear una nueva empresa
router.post('/empresa/crear', EmpresaController.crearEmpresa);

// Ruta para obtener todas las empresas
router.post('/empresas/obtener', EmpresaController.obtenerEmpresas);

// Ruta para actualizar una empresa
router.post('/empresa/actualizar', EmpresaController.actualizarEmpresa);

// Ruta para eliminar una empresa
router.post('/empresa/eliminar', EmpresaController.eliminarEmpresa);

module.exports = router;
