const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const SECRET_KEY = 'ind3xP3ru'; // Cambia esto por una clave secreta segura

class AuthService {

  static async authenticateUser(identifier, password, role) {
    let user;

    // Si el rol es 'asesor', se busca por correo
    if (role === 'asesor') {
      user = await User.findOne({ where: { email: identifier } });
    }
    // Si el rol es 'cliente' (usuario normal), se busca por DNI
    else if (role === 'cliente') {
      user = await User.findOne({ where: { dni: identifier } });

      if (user) {

        if (identifier === user.dni) {
          
          return user; 
        } else {
          
          if (bcrypt.compareSync(password, user.password)) {
            return user; 
          }
        }
      }
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null; 
  }

  static generateToken(user) {
    const payload = {
      id: user.id,
      dni: user.dni,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); 
  }
}

module.exports = AuthService;
