const User = require('../models/User'); // Modelo de User
const Inversion = require('../models/Inversion'); // Modelo de Inversion
const sequelize = require('../config/database');



class RegistroService {

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
      throw new Error('Error al registrar el cliente y la inversión: ' + error.errors );
    }
  }

  static async registrarInversion(inversionData) {
    const transaction = await sequelize.transaction();

    try{
      const nuevaInversion = await Inversion.create(inversionData, { transaction });
      await transaction.commit();
      return { success: true, nuevaInversion };
    }
    catch(error){
      await transaction.rollback();
      throw new Error('Error al registrar la inversión: ' + error.errors);
    }
  }

  static async registrarAsesor(asesorData) {
    const transaction = await sequelize.transaction();
    console.log(asesorData, "asesorData");
    try{
      const nuevoAsesor = await User.create(asesorData, { transaction });
      await transaction.commit();
      return { success: true, nuevoAsesor };
    }
    catch(error){
      await transaction.rollback();
      throw new Error('Error al registrar el asesor: ' + error.errors);
    }
  }


}

module.exports = RegistroService;
