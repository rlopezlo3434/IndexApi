const AnalisisService = require('../services/AnalisisService');

class AnalisisController {

    static async getUsersWithInvestments(req, res) {
        try {
            // Llama al servicio que obtiene los datos
            const usersWithInvestments = await AnalisisService.obtenerUsuariosConInversiones();
            
            // Devuelve la respuesta en formato JSON
            return res.status(200).json({
                success: true,
                data: usersWithInvestments
            });
        } catch (error) {
            console.error('Error en getUsersWithInvestments:', error);

            // En caso de error, envía un código 500 con el mensaje de error
            return res.status(500).json({
                success: false,
                message: 'Error al obtener usuarios con sus inversiones',
                error: error.message
            });
        }
    }

    static async getMontosPorEmpresa(req, res) {
        try {
            const montos = await AnalisisService.getTotalsByEmpresa();
            return res.status(200).json(montos);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getClientesEnRangoFechas(req, res) {
        try {
            console.log(req.body); // Log de los parámetros de la solicitud para fines de depuración
            // Obtener las fechas desde los parámetros de la solicitud
            const { fechaInicio, fechaFin } = req.body.params; // Suponiendo que las fechas se pasan como parámetros de consulta
            console.log(fechaInicio, fechaFin);
            // Validar que se reciban ambas fechas


            // Llamar al servicio que obtiene la cantidad de clientes en el rango de fechas
            const cantidadClientes = await AnalisisService.getClientesEnRangoFechas(fechaInicio, fechaFin);

            // Devolver la respuesta con la cantidad de clientes
            return res.status(200).json({ cantidad: cantidadClientes });
        } catch (error) {
            console.error(error); // Log del error para fines de depuración
            return res.status(500).json({ message: error.message });
        }
    }

    static async obtenerInversionesPorVencer(req, res) {
        try {
            const resultado = await AnalisisService.contarInversionesPorVencer();
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener inversiones por vencer' });
        }
    }

    static async obtenerInversionesVencidas(req, res) {
        const { fechaInicio, fechaFin } = req.body.params; // Asegúrate de enviar las fechas en el cuerpo de la solicitud
    
        try {
            const cantidad = await AnalisisService.contarInversionesVencidas(fechaInicio, fechaFin);
            res.json({ cantidad_inversiones_vencidas: cantidad });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = AnalisisController;
