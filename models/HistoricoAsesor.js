const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de que la ruta sea correcta
const User = require('./User'); // Importa el modelo User correctamente

const HistoricoAsesor = sequelize.define('HistoricoAsesor', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false, // Establecer que no puede ser null
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  texto: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  // Otros campos según tu necesidad
}, {
  tableName: 'historico_asesores',
  timestamps: true,
});



module.exports = HistoricoAsesor;
