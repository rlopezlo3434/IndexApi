const { Op, fn, col, literal } = require('sequelize');
const User = require('../models/User');
const Inversion = require('../models/Inversion'); // Modelo de Inversion

class ClienteService {

    static async getClientesAsesor(fechaInicioDesde, fechaInicioHasta, fechaVencInicio, fechaVencHasta, moneda, empresa, asesor) {
        try {
            // Filtros que se aplican
            const filtros = {};
    
            // Filtrar por rango de fecha de inicio
            if (fechaInicioDesde && fechaInicioHasta) {
                filtros.fecha_inicio = {
                    [Op.gte]: new Date(fechaInicioDesde),
                    [Op.lte]: new Date(fechaInicioHasta)
                };
            }
    
            // Filtrar por rango de fecha de vencimiento
            if (fechaVencInicio && fechaVencHasta) {
                filtros.fecha_vencimiento = {
                    [Op.gte]: new Date(fechaVencInicio),
                    [Op.lte]: new Date(fechaVencHasta)
                };
            }
    
            // Filtrar por empresa si está definido
            if (empresa) {
                filtros.empresa = empresa;
            }
    
            console.log(filtros, asesor);
    
            // Búsqueda con agrupación y agregaciones
            const inversiones = await Inversion.findAll({
                attributes: [
                    'user_id', // Aseguramos que se tenga el id del usuario para la relación
                    [literal(`CONCAT(user.nombre, ' ', user.apellido)`), 'nombre_usuario'],
                    [fn('MIN', col('Inversion.fecha_inicio')), 'primera_fecha_inicio'],
                    [fn('MIN', col('Inversion.estado')), 'primer_estado'], // Mantener MIN de estado
                    [fn('MAX', col('Inversion.fecha_vencimiento')), 'primera_fecha_vencimiento'],
                    [fn('MIN', col('Inversion.frecuencia')), 'primera_frecuencia'],
                    [fn('SUM', col('Inversion.monto_soles')), 'total_monto_soles'],
                    [fn('SUM', col('Inversion.monto_dolares')), 'total_monto_dolares'],
                    [fn('MIN', col('Inversion.empresa')), 'empresa'],
                    [fn('MIN', col('Inversion.rentabilidad')), 'primer_rentabilidad'],
                ],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['nombre', 'apellido', 'email'],
                    where: asesor ? { asesor: asesor } : {} // Solo filtrar por asesor si se proporciona
                }],
                where: filtros,
                group: [
                    'user_id', 
                    'user.nombre', 
                    'user.apellido', 
                    'user.email' 
                ] // No agregamos estado aquí
            });
    
            return inversiones;
        } catch (error) {
            console.error('Error al obtener clientes por asesor:', error);
            throw new Error('Error al obtener clientes.');
        }
    }

    static async getInversionesAgrupadasPorUsuario(userId) {
        try {
            if (!userId) {
                throw new Error('El ID de usuario es requerido.');
            }
    
            // Buscar todas las inversiones del usuario específico
            const inversiones = await Inversion.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['nombre', 'apellido', 'email', 'id', 'asesor',  'dni','phone','fecha_nacimiento'], // Información básica del usuario
                        include: [
                            {
                                model: User,
                                as: 'asesorData', // Datos del asesor
                                attributes: ['nombre', 'apellido', 'email', 'id'] // Información del asesor
                            }
                        ]
                    }
                ],
                order: [['fecha_inicio', 'ASC']]
            });
    
            // Agrupar las inversiones bajo la clave "cliente"
            const inversionesAgrupadas = {
                cliente: {
                    usuario: {
                        nombre: inversiones[0]?.user.nombre,
                        apellido: inversiones[0]?.user.apellido,
                        email: inversiones[0]?.user.email,
                        dni: inversiones[0]?.user.dni,
                        phone: inversiones[0]?.user.phone,
                        fecha_nacimiento: inversiones[0]?.user.fecha_nacimiento,
                        asesor: inversiones[0]?.user?.asesorData ? {
                            nombre: inversiones[0]?.user.asesorData.nombre,
                            apellido: inversiones[0]?.user.asesorData.apellido,
                            email: inversiones[0]?.user.asesorData.email,
                            id: inversiones[0]?.user.asesorData.id
                        } : null
                    },
                    inversiones: inversiones.map(inv => ({
                        id: inv.id,
                        fecha_inicio: inv.fecha_inicio,
                        fecha_vencimiento: inv.fecha_vencimiento,
                        monto_soles: inv.monto_soles,
                        monto_dolares: inv.monto_dolares,
                        fondo: inv.fondo,
                        rentabilidad: inv.rentabilidad,
                        objetivo: inv.objetivo,
                        frecuencia: inv.frecuencia,
                        empresa: inv.empresa,
                        estado: inv.estado,
                        tipoInversion: inv.tipoInversion,
                        perfilInversion: inv.perfilInversion,
                        nombre2: inv.nombre2,
                        apellido2: inv.apellido2,
                        dni2: inv.dni2,
                        email2: inv.email2,
                        phone2: inv.phone2,
                        fecha_nacimiento2: inv.fecha_nacimiento2,
                        nombre3: inv.nombre3,
                        apellido3: inv.apellido3,
                        dni3: inv.dni3,
                        email3: inv.email3,
                        phone3: inv.phone3,
                        fecha_nacimiento3: inv.fecha_nacimiento3,
                        update: inv.updatedAt,
                        documento: inv.documento,
                        nombre_documento: inv.nombre_documento
                    }))
                }
            };
    
            return inversionesAgrupadas;
    
        } catch (error) {
            console.error('Error al obtener inversiones por usuario:', error);
            throw new Error('Error al obtener inversiones del usuario.');
        }
    }


    static async getlistaAsesores() {
        try {
            const asesores = await User.findAll({
                where: {
                    rol_id: 2
                }
            });
            return asesores;
        } catch (error) {
            console.error('Error al obtener la lista de asesores:', error);
            throw new Error('Error al obtener la lista de asesores.');
        }
    }
}

module.exports = ClienteService;
