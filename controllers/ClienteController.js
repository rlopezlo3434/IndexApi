const ClienteService = require('../services/ClienteService');

class ClienteController {

    static async getClientesAsesor(req, res) {
        console.log(req.body);
        const { fechaInicioDesde, fechaInicioHasta, fechaVencInicio, fechaVencHasta, moneda, empresa, asesor } = req.body.params; // Obtener el asesor del cuerpo de la solicitud
        try{
            const clientes = await ClienteService.getClientesAsesor(fechaInicioDesde, fechaInicioHasta, fechaVencInicio, fechaVencHasta, moneda, empresa,asesor);
            return res.status(200).json(clientes);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getCliente(req, res) {
        const { id } = req.body.params;
        try {
            const cliente = await ClienteService.getInversionesAgrupadasPorUsuario(id);
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getListaAsesores(req, res) {
        try {
            const asesores = await ClienteService.getlistaAsesores();
            return res.status(200).json(asesores);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ClienteController;
