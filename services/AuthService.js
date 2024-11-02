const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const SECRET_KEY = 'ind3xP3ru'; // Cambia esto por una clave secreta segura

class AuthService {
    
  static async authenticateUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  static generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token expira en 1 hora
  }
}

module.exports = AuthService;
