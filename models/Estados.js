const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu estructura

const Estado = sequelize.define('Estado', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  estado_nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true, // Para asegurar que no se repitan nombres de estado
  },
  descripcion: {
    type: DataTypes.STRING(255), // Puedes ajustar el tamaño si es necesario
    allowNull: true, // Puede ser nulo si no todas las entradas necesitan descripción
  },
}, {
  tableName: 'estados',  // Especifica el nombre de la tabla en la base de datos
  timestamps: true,      // Maneja automáticamente createdAt y updatedAt
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Estado;
