const RegistroService = require('../services/RegistroService');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio que utilices
  auth: {
    user: 'rlopezlo3434@gmail.com', // Tu correo
    pass: 'iodo rxqv owpj xbgl' // Contraseña o App Password
  }
});

class RegistroController {

  static generarContraseña() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contraseña = '';
    for (let i = 0; i < 10; i++) {
      contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contraseña;
  }

  static async registrarCliente(req, res) {
    console.log(req);
    const { nombre, apellido, password, dni, email, phone, fecha_nacimiento, rol_id, asesor } = req.body.params;
    const { fecha_inicio, fecha_vencimiento, monto_soles, monto_dolares, fondo, rentabilidad, objetivo, frecuencia, tipoInversion, perfilInversion, empresa,
      user_id, estado, nombre2, apellido2, dni2, email2, phone2, fecha_nacimiento2,
      nombre3, apellido3, dni3, email3, phone3, fecha_nacimiento3, nombre_documento, documento, tipo_documento
    } = req.body.params;

    let documentoBuffer = null;
    if (documento) {
      // Remover el prefijo de data:application/...;base64,
      const base64Data = documento.split(';base64,').pop();
      documentoBuffer = Buffer.from(base64Data, 'base64');
    }

    const contraseñaGenerada = RegistroController.generarContraseña();
    console.log('Contraseña generada:', contraseñaGenerada);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseñaGenerada, salt);

    console.log('Hash de la contraseña:', hashedPassword);

    const mailOptions = {
      from: 'rlopezlo3434@gmail.com',
      to: email,
      subject: 'Bienvenido a Index! Aquí está tu contraseña generada',
      text: `Hola! Esta es tu nueva contraseña generada: ${contraseñaGenerada}`
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
 
     
    // Convertir a número y manejar valores null o NaN
    const monto_soless = (monto_soles !== null && !isNaN(parseFloat(monto_soles))) ? parseFloat(monto_soles) : 0.0;
    const monto_dolaress = (monto_dolares !== null && !isNaN(parseFloat(monto_dolares))) ? parseFloat(monto_dolares) : 0.0;

    // Imprimir los resultados
    console.log(monto_soless);  // Salida: valor convertido o 0.0
    console.log(monto_dolaress); // Salida: valor convertido o 0.0


    const fechaNacimiento3Final = fecha_nacimiento3.trim() === ''
      ? '1900-01-01'
      : fecha_nacimiento3;

    const fechaNacimiento2Final = fecha_nacimiento2.trim() === ''
      ? '1900-01-01'
      : fecha_nacimiento2;

    const userData = {
      nombre,
      apellido,
      password: hashedPassword, // Aquí asegúrate de que el password se encripte antes
      dni,
      email,
      phone,
      fecha_nacimiento,
      rol_id,
      asesor,
      nombre_documento: '',
      documento: '',
      tipo_documento: ''
    };

    const inversionData = {
      fecha_inicio,
      fecha_vencimiento,
      monto_soles: monto_soless,
      monto_dolares: monto_dolaress,
      fondo,
      rentabilidad,
      objetivo,
      frecuencia,
      tipoInversion,
      perfilInversion,
      empresa,
      user_id,
      estado,
      nombre2,
      apellido2,
      dni2,
      email2,
      phone2,
      fecha_nacimiento2: fechaNacimiento2Final,
      nombre3,
      apellido3,
      dni3,
      email3,
      phone3,
      fecha_nacimiento3: fechaNacimiento3Final,
      nombre_documento,
      documento: documentoBuffer,
      tipo_documento
    };


    try {
      const result = await RegistroService.registrarClienteYInversion(userData, inversionData);
      res.status(201).json({ message: 'Cliente e inversión registrados exitosamente', usuario: result.nuevoUsuario });
    } catch (error) {
      console.log("entrooo", error);
      res.status(500).json({ message: error.message });
    }
  }

  static async registerInversion(req, res) {
    console.log(req.body);
    const { fecha_inicio, fecha_vencimiento, monto_soles, monto_dolares, fondo, rentabilidad, objetivo, frecuencia, tipoInversion, perfilInversion, empresa,
      user_id, estado, nombre2, apellido2, dni2, email2, phone2, fecha_nacimiento2,
      nombre3, apellido3, dni3, email3, phone3, fecha_nacimiento3, nombre_documento, documento, tipo_documento
    } = req.body.params;
    let documentoBuffer = null;
    if (documento) {
      // Remover el prefijo de data:application/...;base64,
      const base64Data = documento.split(';base64,').pop();
      documentoBuffer = Buffer.from(base64Data, 'base64');
    }

    // Convertir a número y manejar valores null o NaN
    const monto_soless = (monto_soles !== null && !isNaN(parseFloat(monto_soles))) ? parseFloat(monto_soles) : 0.0;
    const monto_dolaress = (monto_dolares !== null && !isNaN(parseFloat(monto_dolares))) ? parseFloat(monto_dolares) : 0.0;

    const fechaNacimiento3Final = fecha_nacimiento3.trim() === ''
      ? '1900-01-01'
      : fecha_nacimiento3;

    const fechaNacimiento2Final = fecha_nacimiento2.trim() === ''
      ? '1900-01-01'
      : fecha_nacimiento2;


    // Imprimir los resultados
    console.log(monto_soless);  // Salida: valor convertido o 0.0
    console.log(monto_dolaress); // Salida: valor convertido o 0.0

    const inversionData = {
      fecha_inicio,
      fecha_vencimiento,
      monto_soles: monto_soless,
      monto_dolares: monto_dolaress,
      fondo,
      rentabilidad,
      objetivo,
      frecuencia,
      tipoInversion,
      perfilInversion,
      empresa,
      user_id,
      estado,
      nombre2,
      apellido2,
      dni2,
      email2,
      phone2,
      fecha_nacimiento2: fechaNacimiento2Final,
      nombre3,
      apellido3,
      dni3,
      email3,
      phone3,
      fecha_nacimiento3: fechaNacimiento3Final,
      nombre_documento,
      documento: documentoBuffer,
      tipo_documento
    };

    try {
      const result = await RegistroService.registrarInversion(inversionData);
      res.status(201).json({ message: 'Cliente e inversión registrados exitosamente', usuario: result.nuevoUsuario });
    } catch (error) {
      console.log("entrooo", error);
      res.status(500).json({ message: error.message });
    }
  }

  static async registerAsesor(req, res) {
    console.log(req.body);
    const { nombre, apellido, password, dni, email, phone, fecha_nacimiento, rol_id, asesor, nombre_documento, documento, tipo_documento } = req.body.params;

    let documentoBuffer = null;
    if (documento) {
      // Remover el prefijo de data:application/...;base64,
      const base64Data = documento.split(';base64,').pop();
      documentoBuffer = Buffer.from(base64Data, 'base64');
    }

    const contraseñaGenerada = RegistroController.generarContraseña();
    console.log('Contraseña generada:', contraseñaGenerada);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseñaGenerada, salt);

    console.log('Hash de la contraseña:', hashedPassword);

    const mailOptions = {
      from: 'rlopezlo3434@gmail.com',
      to: email,
      subject: 'Bienvenido a Index! Aquí está tu contraseña generada',
      text: `Hola! Esta es tu nueva contraseña generada: ${contraseñaGenerada}`
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');

    const userData = {
      nombre,
      apellido,
      password: hashedPassword, // Aquí asegúrate de que el password se encripte antes
      dni,
      email,
      phone,
      fecha_nacimiento,
      rol_id,
      asesor,
      nombre_documento,
      documento: documentoBuffer,
      tipo_documento
    };

    try {
      const result = await RegistroService.registrarAsesor(userData);
      res.status(201).json({ message: 'Asesor registrado exitosamente', usuario: result.nuevoAsesor });
    } catch (error) {
      console.log("entrooo", error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RegistroController;
