const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura

const Inversion = sequelize.define('Inversion', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  monto_soles: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  monto_dolares: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  fondo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  rentabilidad: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
  },
  objetivo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  frecuencia: {
    type: DataTypes.STRING(50), // Ejemplo: "Mensual", "Trimestral"
    allowNull: true,
  },
  empresa: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  tipoInversion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  perfilInversion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  nombre2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  apellido2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  dni2: {
    type: DataTypes.STRING(8),
    allowNull: true,
  },
  email2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  phone2: {
    type: DataTypes.STRING(9),
    allowNull: true,
  },
  fecha_nacimiento2: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: '1900-01-01'
  },
  nombre3: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  apellido3: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  dni3: {
    type: DataTypes.STRING(8),
    allowNull: true,
  },
  email3: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  phone3: {
    type: DataTypes.STRING(9),
    allowNull: true,
  },
  fecha_nacimiento3: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: '1900-01-01'
  },
  nombre_documento: {
    type: DataTypes.STRING(255), // Para VARCHAR(255)
    allowNull: true, // Cambia a false si deseas que sea obligatorio
  },
  documento: {
    type: DataTypes.BLOB('long'), // Usa 'long' para archivos grandes
    allowNull: false,
  },
  tipo_documento: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'inversion',
  timestamps: true,
});

// Relacionar la inversión con otras tablas
const Estado = require('./Estados'); // Modelo de Estado
const TipoInversion = require('./TipoInversion'); // Modelo de TipoInversion
const PerfilInversion = require('./PerfilInversion'); // Modelo de PerfilInversion
const Empresa = require('./Empresa'); // Modelo de Empresa
const User = require('./User'); // Modelo de User

console.log(User, "User Inversion")
Inversion.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: true,
  },
  as: 'user',
});


module.exports = Inversion;
