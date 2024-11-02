const express = require('express');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoded' })
const userRoutes = require('./routes/userRoutes'); // Asegúrate de que la ruta al archivo sea correcta
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const analisisRoutes = require('./routes/analisisRoutes');
const sequelize = require('./config/database'); // Configuración de Sequelize
const cookieParser = require('cookie-parser');
var cors = require('cors');
const app = express();

// Middleware para parsear JSON
// app.use(bodyParser.json());

// Middleware para parsear URL-encoded
// Configura el tamaño máximo permitido, por ejemplo, 50MB
// app.use(bodyParser.json({ limit: '500mb' }));
// app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

// Configura el tamaño máximo permitido para `Express`
app.use(jsonParser);
  app.use(urlencodedParser);
// Middleware para cookies
app.use(cookieParser());

app.use(cors({
  origin: true,  // El origen específico permitido
  credentials: true                 // Permite el envío de cookies y credenciales
}));
// Usar las rutas de usuario
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', registerRoutes);
app.use('/api', clienteRoutes);
app.use('/api', analisisRoutes);

// Manejo de errores generales (opcional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);

  // Sincronizar con la base de datos
  try {
    await sequelize.sync({ alter: true }); // Sincroniza modelos con la base de datos
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
});
