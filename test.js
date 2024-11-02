const bcrypt = require('bcryptjs');

const password = '123456789'; // La contraseña que deseas encriptar

// Número de rondas de salt (cuanto mayor sea, más seguro pero más lento será el proceso)
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al encriptar la contraseña:', err);
  } else {
    console.log('Contraseña encriptada:', hash);
  }
});
