const { Sequelize } = require('sequelize');

// Crea una instancia de Sequelize con la información de conexión
const sequelize = new Sequelize('railway', 'root', 'WIEJUkRxKnScrXNKOmZOXSiCZGuPCPqb', {
    host: 'mysql.railway.internal', // Cambia esto si es necesario
    port: 3306,
    dialect: 'mysql',
});

// Prueba la conexión
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

// Llama a la función para probar la conexión
testConnection();