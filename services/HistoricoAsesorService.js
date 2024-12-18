const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura

class HistoricoAsesorService {
  // Método para agregar un registro al histórico usando sentencia SQL
  static async agregarHistorico(userId, texto) {
    try {
      // Sentencia SQL para insertar un nuevo histórico
      const query = `
        INSERT INTO historico_asesores (user_id, texto)
        VALUES (:userId, :texto)
      `;
      //holasasd
      
      // Ejecutar la consulta con parámetros
      await sequelize.query(query, {
        replacements: { userId, texto },
        type: QueryTypes.INSERT, // Tipo de consulta para inserciones
      });

      return { message: 'Histórico agregado con éxito' };
    } catch (error) {
      console.error('Error al agregar al histórico:', error);
      throw new Error('No se pudo agregar al histórico.');
    }
  }

  // Método para leer el histórico de un usuario
  static async obtenerHistoricoPorUsuario(userId) {
    try {
      const historico = await sequelize.query(
        `SELECT ha.* FROM historico_asesores ha
           JOIN users u ON ha.user_id = u.id
           WHERE ha.user_id = :userId order by ha.fecha desc`,
        {
          replacements: { userId },
          type: QueryTypes.SELECT, // Tipo de consulta SELECT
        }
      );
      return historico;
    } catch (error) {
      console.error('Error al obtener el histórico:', error);
      throw error;
    }
  }
}

module.exports = HistoricoAsesorService;
