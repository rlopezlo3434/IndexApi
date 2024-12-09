const HistoricoAsesorService = require('../services/HistoricoAsesorService');

class HistoricoAsesorController {
    // Endpoint para agregar un nuevo registro al histórico
    static async agregarHistorico(req, res) {
        try {
            const { userId, texto } = req.body.params;

            // Validación simple de datos
            if (!userId || !texto) {
                return res.status(400).json({ error: 'El userId y texto son obligatorios.' });
            }

            const nuevoHistorico = await HistoricoAsesorService.agregarHistorico(userId, texto);
            res.status(201).json({ message: 'Histórico agregado con éxito.', data: nuevoHistorico });
        } catch (error) {
            res.status(500).json({ error: 'Error al agregar al histórico.', details: error.message });
        }
    }

    // Endpoint para obtener el histórico de un usuario
    static async obtenerHistorico(req, res) {
        try {
            console.log(req.body);
            const { userId } = req.body.params;

            if (!userId) {
                return res.status(400).json({ error: 'El userId es obligatorio.' });
            }

            const historico = await HistoricoAsesorService.obtenerHistoricoPorUsuario(userId);
            res.status(200).json({ data: historico });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el histórico.', details: error.message });
        }
    }
}

module.exports = HistoricoAsesorController;
