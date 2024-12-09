const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role'); // Asegúrate de importar el modelo Role si hay una relación
const HistoricoAsesor = require('./HistoricoAsesor'); // Asegúrate de importar el modelo HistoricoAsesor si hay una relación

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING(8),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(9),
    allowNull: true,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  rol_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'roles', // Nombre de la tabla a la que hace referencia
      key: 'id',
    },
  },
  asesor: {
    type: DataTypes.BIGINT, // Tipo de dato, puedes usar BIGINT si es necesario
    allowNull: true, // Permite valores nulos
    defaultValue: 0, // Valor por defecto
  },
  nombre_documento: {
    type: DataTypes.STRING(255), // Para VARCHAR(255)
    allowNull: true, // Cambia a false si deseas que sea obligatorio
  },
  documento: {
    type: DataTypes.BLOB('long'), // Usa 'long' para archivos grandes
    allowNull: true,
  },
  tipo_documento: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users',  // Especifica el nombre de la tabla en la base de datos
  timestamps: true,    // Maneja automáticamente createdAt y updatedAt
  createdAt: 'created_at',
  updatedAt: false,    // Si no necesitas updatedAt, puedes desactivarlo
});

// Definir la relación con el modelo Role si es necesario
User.belongsTo(Role, { foreignKey: 'rol_id', as: 'role' });
User.hasOne(User, { as: 'asesorData', foreignKey: 'id', sourceKey: 'asesor' });
// User.hasMany(HistoricoAsesor, { foreignKey: 'user_id', as: 'historicoAsesor' });


module.exports = User;
