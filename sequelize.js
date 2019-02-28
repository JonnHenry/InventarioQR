var Sequelize = require('sequelize');
var conexion = new Sequelize('InventarioQR', 'jonnathan@inventarioqr', 'Jhca19960121', { // Conexión a la base de datos
    host: 'inventarioqr.database.windows.net',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        encrypt: true
    }
});

// Importación de los modelos
const ProductosModel = require('./models/Productos');
const InventariosModel = require('./models/Inventarios'); 
const Inventario_ProductosModel = require('./models/Inventarios_Productos');

var Productos = ProductosModel(conexion,Sequelize);
var Inventarios = InventariosModel(conexion,Sequelize);
var Inventario_Productos = Inventario_ProductosModel(conexion,Sequelize);



conexion.sync({force: true }).then(()=>{
    console.log('Tablas Creadas exitosamente!')
});

module.exports.Productos = Productos;
module.exports.Inventarios = Inventarios;
module.exports.Inventario_Productos = Inventario_Productos; 