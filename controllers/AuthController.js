const AuthService = require('../services/AuthService');

class AuthController {
    
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.authenticateUser(email, password);
      if (user) {
        const token = AuthService.generateToken(user);
        res.cookie('token', token); // Almacena el token en una cookie segura
        res.status(200).json({ message: 'Inicio de sesión exitoso', user: user});
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
  }
}

module.exports = AuthController;
