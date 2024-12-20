const User = require('../models/User'); // Modelo de User
const Inversion = require('../models/Inversion'); // Modelo de Inversion
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const { QueryTypes } = require('sequelize');
class RegistroService {

  static async updatePasswordById(userId, newPassword) {
    try {
      // Generar salt y encriptar la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Ejecutar la consulta para actualizar la contraseña
      const result = await sequelize.query(
        `UPDATE users
         SET password = :hashedPassword
         WHERE id = :userId`,
        {
          replacements: { hashedPassword, userId },
          type: QueryTypes.UPDATE, // Tipo de consulta UPDATE
        }
      );

      return {
        message: 'Contraseña actualizada correctamente',
        rowsAffected: result[1], // Número de filas afectadas
      };
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error;
    }
  }

  static async updateDocumentoByID(id, documento, nombre_documento, tipo_documento) {
    try {

      let documentoBuffer = null;
      if (documento) {
        // Remover el prefijo de data:application/...;base64,
        const base64Data = documento.split(';base64,').pop();
        documentoBuffer = Buffer.from(base64Data, 'base64');
      }

      // Ejecutar la consulta para actualizar la contraseña
      const result = await sequelize.query(
        `UPDATE inversion
         SET
             documento = :documentoBuffer,
             nombre_documento = :nombre_documento,
             tipo_documento = :tipo_documento
         WHERE id = :id`,
        {
          replacements: { id, documentoBuffer, nombre_documento, tipo_documento },
          type: QueryTypes.UPDATE, // Tipo de consulta UPDATE
        }
      );

      return {
        message: 'Documento actualizada correctamente',
        rowsAffected: result[1], // Número de filas afectadas
      };
    } catch (error) {
      console.error('Error al actualizar el Documento:', error);
      throw error;
    }
  }

  static async updateEstadoById(id, estado) {
    try {

      // Ejecutar la consulta para actualizar la contraseña
      const result = await sequelize.query(
        `UPDATE inversion
         SET estado = :estado
         WHERE id = :id`,
        {
          replacements: { estado, id },
          type: QueryTypes.UPDATE, // Tipo de consulta UPDATE
        }
      );

      return {
        message: 'Inversion actualizada correctamente',
        rowsAffected: result[1], // Número de filas afectadas
      };
    } catch (error) {
      console.error('Error al actualizar la inversion:', error);
      throw error;
    }
  }

  static async registrarClienteYInversion(userData, inversionData) {
    const transaction = await sequelize.transaction(); // Inicia la transacción

    try {
      // Insertar el nuevo usuario
      console.log(userData, "userData");
      const nuevoUsuario = await User.create(userData, { transaction });
      console.log(nuevoUsuario, "nuevoUsuario");

      // Preparar los datos de la inversión, usando el ID del nuevo usuario
      inversionData.user_id = nuevoUsuario.id;

      // Insertar la nueva inversión relacionada con el usuario
      await Inversion.create(inversionData, { transaction });

      // Confirmar la transacción si todo va bien
      await transaction.commit();

      return { success: true, nuevoUsuario };
    } catch (error) {
      // Si ocurre un error, revertir la transacción
      await transaction.rollback();

      // Manejo del error con más detalle
      throw new Error('Error al registrar el cliente y la inversión: ' + error.errors);
    }
  }

  static async registrarInversion(inversionData) {
    const transaction = await sequelize.transaction();

    try {
      const nuevaInversion = await Inversion.create(inversionData, { transaction });
      await transaction.commit();
      return { success: true, nuevaInversion };
    }
    catch (error) {
      await transaction.rollback();
      throw new Error('Error al registrar la inversión: ' + error.errors);
    }
  }

  static async registrarAsesor(asesorData) {
    const transaction = await sequelize.transaction();
    console.log(asesorData, "asesorData");
    try {
      const nuevoAsesor = await User.create(asesorData, { transaction });
      await transaction.commit();
      return { success: true, nuevoAsesor };
    }
    catch (error) {
      await transaction.rollback();
      throw new Error('Error al registrar el asesor: ' + error.errors);
    }
  }


}

module.exports = RegistroService;
