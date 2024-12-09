const { Op, fn, col, literal } = require('sequelize');
const Inversion = require('../models/Inversion'); // Modelo de Inversion
const User = require('../models/User');

class AnalisisService {
    static async getTotalsByEmpresa() {
        try {
            return await Inversion.findAll({
                attributes: [
                    'empresa',
                    [fn('SUM', col('monto_soles')), 'total_monto_soles'],
                    [fn('SUM', col('monto_dolares')), 'total_monto_dolares']
                ],
                group: ['empresa']
            });
        } catch (error) {
            console.error(error); // Agrega esto para ver el error exacto en la consola
            throw new Error('Error al obtener los totales por empresa');
        }
    }

    static async getClientesEnRangoFechas(fechaInicio, fechaFin) {
        try {
            // Si no se proporcionan fechas, establecer por defecto el inicio y fin del mes actual
            if (!fechaInicio || !fechaFin) {
                const ahora = new Date();
                // Primer día del mes actual
                fechaInicio = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
                // Último día del mes actual
                fechaFin = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 0, 23, 59, 59); // Hasta el último segundo del mes
            }

            // Asegurarse de que las fechas se conviertan a objetos Date
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);

            // Validar que la fecha de inicio no sea posterior a la fecha de fin
            if (inicio > fin) {
                throw new Error('La fecha de inicio no puede ser posterior a la fecha de fin');
            }

            return await User.count({
                where: {
                    created_at: {
                        [Op.gte]: inicio, // Mayor o igual a la fecha de inicio
                        [Op.lt]: fin // Menor a la fecha de fin
                    }
                }
            });
        } catch (error) {
            console.error(error); // Para ver el error en la consola
            throw new Error('Error al obtener la cantidad de clientes en el rango de fechas');
        }
    }

    static async obtenerUsuariosConInversiones() {
        try {
          const usuarios = await User.findAll({
            include: [
              {
                model: Inversion,
                as: 'user', // Este debe coincidir con el alias en el modelo `Inversion`
                foreignKey: 'user_id', // Especifica la clave foránea manualmente
              },
            ],
            order: [['nombre', 'ASC'], ['inversiones', 'fecha_inicio', 'ASC']],
          });
      
          return usuarios;
        } catch (error) {
          console.error('Error al obtener usuarios con inversiones:', error);
          throw error;
        }
      };

    static async contarInversionesPorVencer() {
        const fechaInicio = new Date();
        fechaInicio.setMonth(fechaInicio.getMonth() + 1);
        fechaInicio.setDate(1); // Primer día del próximo mes

        const fechaFin = new Date();
        fechaFin.setMonth(fechaFin.getMonth() + 2);
        fechaFin.setDate(1); // Primer día del mes siguiente al próximo

        try {
            const resultado = await Inversion.count({
                where: {
                    fecha_vencimiento: {
                        [Op.gte]: fechaInicio,
                        [Op.lt]: fechaFin,
                    },
                },
            });

            return { cantidad_inversiones_por_vencer: resultado };
        } catch (error) {
            console.error('Error al contar inversiones por vencer:', error);
            throw error;
        }
    }

    static async contarInversionesVencidas(fechaInicio, fechaFin) {
        try {
            const resultado = await Inversion.count({
                where: {
                    fecha_vencimiento: {
                        [Op.lt]: new Date(), // Vencidas hasta hoy
                    },
                    fecha_vencimiento: {
                        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)] // Rango de fechas
                    }
                }
            });
    
            return resultado; // Retorna el conteo de inversiones vencidas
        } catch (error) {
            throw new Error('Error al contar inversiones vencidas: ' + error.message);
        }
    }


}

module.exports = AnalisisService;
