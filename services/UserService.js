const User = require('../models/User');
const Role = require('../models/Role');

class UserService {
  // Obtener todos los usuarios con sus roles asociados
  static async getAllUsers() {
    try {
      return await User.findAll({
        include: { model: Role, as: 'role' },
      });
    } catch (error) {
      throw new Error('Error al obtener los usuarios');
    }
  }

  // Obtener un usuario por su ID
  static async getUserById(userId) {
    try {
      return await User.findByPk(userId, {
        include: { model: Role, as: 'role' },
      });
    } catch (error) {
      throw new Error('Error al obtener el usuario');
    }
  }

  static async getUsersByAsesor(asesor) {
    try {
      return await User.findAll({
        where: {
          asesor: asesor, // Ajusta este campo según la estructura de tu modelo
        },
        include: { model: Role, as: 'role' },
        attributes: { exclude: ['password'] },
      });
    } catch (error) {
      throw new Error('Error al obtener usuarios por asesor');
    }
  }
}

module.exports = UserService;
