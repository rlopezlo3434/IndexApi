const UserService = require('../services/UserService');

class UserController {
  // Obtener todos los usuarios
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
  }

  // Obtener un usuario por su ID
  static async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
  }

  static async getUsersByAsesor(req, res) {
    const { asesor } = req.body; // Obtener el asesor del cuerpo de la solicitud
    try {
      const users = await UserService.getUsersByAsesor(asesor);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
