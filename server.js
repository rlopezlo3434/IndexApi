// Importación de dependencias
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Importación de modelos
const Role = require('./models/Role');
const User = require('./models/User');
const Invsersion = require('./models/Inversion');
const HistoricoAsesor = require('./models/HistoricoAsesor');

// Importación de rutas
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const analisisRoutes = require('./routes/analisisRoutes');
const historicoAsesorRoutes = require('./routes/historicoRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
// Configuración de Sequelize
const sequelize = require('./config/database');

const app = express();

// Configuración del tamaño máximo para JSON y URL-encoded (ajustado a 20MB)
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

// Middleware para manejo de cookies
app.use(cookieParser());

// Configuración de CORS para permitir cookies y credenciales
app.use(cors({
  origin: true,        // Permitir solicitudes del mismo dominio o del dominio especificado en Railway
  credentials: true    // Permitir envío de cookies y credenciales
}));

// Configuración de rutas de la API
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', registerRoutes);
app.use('/api', clienteRoutes);
app.use('/api', analisisRoutes);
app.use('/api', historicoAsesorRoutes);
app.use('/api', empresaRoutes);

// Middleware para el manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);

  // Sincronización con la base de datos
  try {
    await sequelize.sync({ alter: false });
    await Role.sync();   // Sincroniza la tabla Role primero
    await Invsersion.sync();   // Sincroniza la tabla Inversion después
    await User.sync();   // Sincroniza la tabla User después
    await HistoricoAsesor.sync();   // Sincroniza la tabla Historico
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
});
