const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura

const Empresa = sequelize.define('Empresa', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre_empresa: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ruc: {
    type: DataTypes.STRING(11),
    allowNull: false,
    unique: true, // El RUC debe ser único para evitar duplicados
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true, // La descripción puede ser opcional
  },
}, {
  tableName: 'empresa', // Nombre de la tabla en la base de datos
  timestamps: true,     // Maneja automáticamente createdAt y updatedAt
});

module.exports = Empresa;
