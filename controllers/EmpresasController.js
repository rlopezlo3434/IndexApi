const EmpresaService = require('../services/EmpresasService');

class EmpresaController {
    // Endpoint para crear una nueva empresa
    static async crearEmpresa(req, res) {
        try {
            const { nombre, value } = req.body; // Datos del cuerpo de la solicitud

            // Validación simple de datos
            if (!nombre || !value) {
                return res.status(400).json({ error: 'El nombre y el value son obligatorios.' });
            }

            const nuevaEmpresa = await EmpresaService.crearEmpresa(nombre, value);
            res.status(201).json({ message: 'Empresa creada con éxito.', data: nuevaEmpresa });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la empresa.', details: error.message });
        }
    }

    // Endpoint para obtener todas las empresas
    static async obtenerEmpresas(req, res) {
        try {
            const empresas = await EmpresaService.obtenerEmpresas();
            res.status(200).json({ data: empresas });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las empresas.', details: error.message });
        }
    }

    // Endpoint para obtener una empresa por su ID
    static async obtenerEmpresaPorId(req, res) {
        try {
            const { id } = req.params; // Extraemos el ID de los parámetros

            if (!id) {
                return res.status(400).json({ error: 'El ID de la empresa es obligatorio.' });
            }

            const empresa = await EmpresaService.obtenerEmpresaPorId(id);
            if (!empresa) {
                return res.status(404).json({ error: 'Empresa no encontrada.' });
            }

            res.status(200).json({ data: empresa });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la empresa.', details: error.message });
        }
    }

    // Endpoint para actualizar una empresa
    static async actualizarEmpresa(req, res) {
        try {
            const { id, nombre, value } = req.body; // Datos a actualizar

            if (!id || !nombre || !value) {
                return res.status(400).json({ error: 'El ID, nombre y value son obligatorios.' });
            }

            const empresaActualizada = await EmpresaService.actualizarEmpresa(id, nombre, value);
            if (!empresaActualizada) {
                return res.status(404).json({ error: 'Empresa no encontrada para actualizar.' });
            }

            res.status(200).json({ message: 'Empresa actualizada con éxito.', data: empresaActualizada });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la empresa.', details: error.message });
        }
    }

    // Endpoint para eliminar una empresa
    static async eliminarEmpresa(req, res) {
        try {
            console.log(req.body);
            const { id } = req.body; // Extraemos el ID de los parámetros

            if (!id) {
                console.log('ID:', id);
                return res.status(400).json({ error: 'El ID de la empresa es obligatorio.' });
            }

            const empresaEliminada = await EmpresaService.eliminarEmpresa(id);
            if (!empresaEliminada) {
                return res.status(404).json({ error: 'Empresa no encontrada para eliminar.' });
            }

            res.status(200).json({ message: 'Empresa eliminada con éxito.' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la empresa.', details: error.message });
        }
    }
}

module.exports = EmpresaController;
