// const { Sequelize } = require('sequelize');
// const config = require('./config.js')[process.env.NODE_ENV || 'development'];

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: config.dialect,
// });

// module.exports = sequelize;


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://root:jmzbQQIKPKvUTKyWcraZlghouAPFFSEi@junction.proxy.rlwy.net:46943/railway', {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Esto puede ser necesario dependiendo de las configuraciones SSL de Railway
    },
  },
});

module.exports = sequelize;
