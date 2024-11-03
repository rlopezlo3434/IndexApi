const AuthService = require('../services/AuthService');

class AuthController {
    
  // static async login(req, res) {
  //   const { email, password } = req.body;
  //   try {
  //     const user = await AuthService.authenticateUser(email, password);
  //     if (user) {
  //       const token = AuthService.generateToken(user);
  //       res.cookie('token', token, {
  //         secure: true,        // Asegúrate de que está habilitado para HTTPS
  //         sameSite: 'None',     // Permite que la cookie sea accesible en dominios cruzados
  //         domain: 'index-front2-ijxq.vercel.app'
  //       });
  //       res.status(200).json({ message: 'Inicio de sesión exitoso', user: user});
  //     } else {
  //       res.status(401).json({ message: 'Credenciales inválidas' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  //   }
  // }
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await AuthService.authenticateUser(email, password);
      if (user) {
        const token = AuthService.generateToken(user);
        // Enviar el token en la respuesta JSON
        res.status(200).json({ 
          message: 'Inicio de sesión exitoso', 
          user: user,
          token: token // Incluir el token en la respuesta
        });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
  }
}

module.exports = AuthController;
