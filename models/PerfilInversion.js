const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura

const PerfilInversion = sequelize.define('PerfilInversion', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre_perfil: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // Para asegurar que no haya nombres duplicados de perfil
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true, // Es opcional proporcionar una descripción
  },
}, {
  tableName: 'perfil_inversion', // Nombre de la tabla en la base de datos
  timestamps: true,              // Maneja automáticamente createdAt y updatedAt
});

module.exports = PerfilInversion;
