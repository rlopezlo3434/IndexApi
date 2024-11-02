const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  rol_nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  estado: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 1, // Puedes establecer un valor predeterminado si es necesario
  },
}, {
  tableName: 'roles', // Especifica el nombre de la tabla en la base de datos
  timestamps: true,   // Maneja automáticamente createdAt y updatedAt
});

module.exports = Role;
