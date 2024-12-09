const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura

class EmpresaService {
  // Método para crear una empresa
  static async crearEmpresa(nombre, value) {
    try {
      const query = `
        INSERT INTO empresas (nombre, value)
        VALUES (:nombre, :value)
      `;
      
      // Ejecutar la consulta con los parámetros
      await sequelize.query(query, {
        replacements: { nombre, value },
        type: QueryTypes.INSERT, // Tipo de consulta para inserciones
      });

      return { message: 'Empresa creada con éxito' };
    } catch (error) {
      console.error('Error al crear la empresa:', error);
      throw new Error('No se pudo crear la empresa.');
    }
  }

  // Método para obtener todas las empresas
  static async obtenerEmpresas() {
    try {
      const query = `SELECT * FROM empresas`;
      const empresas = await sequelize.query(query, {
        type: QueryTypes.SELECT, // Tipo de consulta SELECT
      });
      return empresas;
    } catch (error) {
      console.error('Error al obtener las empresas:', error);
      throw new Error('No se pudo obtener las empresas.');
    }
  }

  // Método para obtener una empresa por su ID
  static async obtenerEmpresaPorId(id) {
    try {
      const query = `SELECT * FROM empresas WHERE id = :id`;
      const empresa = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT, // Tipo de consulta SELECT
      });

      if (empresa.length === 0) {
        throw new Error('Empresa no encontrada');
      }

      return empresa[0]; // Retorna solo el primer resultado
    } catch (error) {
      console.error('Error al obtener la empresa por ID:', error);
      throw new Error('No se pudo obtener la empresa.');
    }
  }

  // Método para actualizar una empresa
  static async actualizarEmpresa(id, nombre, value) {
    try {
      const query = `
        UPDATE empresas
        SET nombre = :nombre, value = :value
        WHERE id = :id
      `;
      
      const result = await sequelize.query(query, {
        replacements: { id, nombre, value },
        type: QueryTypes.UPDATE, // Tipo de consulta para actualizaciones
      });

      if (result[0] === 0) {
        throw new Error('Empresa no encontrada');
      }

      return { message: 'Empresa actualizada con éxito' };
    } catch (error) {
      console.error('Error al actualizar la empresa:', error);
      throw new Error('No se pudo actualizar la empresa.');
    }
  }

  // Método para eliminar una empresa
  static async eliminarEmpresa(id) {
    try {
      const query = `DELETE FROM empresas WHERE id = :id`;
      const result = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.DELETE, // Tipo de consulta para eliminaciones
      });


      return { message: 'Empresa eliminada con éxito' };
    } catch (error) {
      console.error('Error al eliminar la empresa:', error);
      throw new Error('No se pudo eliminar la empresa.');
    }
  }
}

module.exports = EmpresaService;
