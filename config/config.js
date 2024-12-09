require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
  },
  
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
};


// module.exports = {
//   development: {
//     username: 'dev_user',
//     password: 'dev_pass',
//     database: 'dev_db',
//     host: '127.0.0.1',
//     dialect: 'mysql',
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: 'mysql.railway.internal',
//     dialect: 'mysql',
//   },
// };
