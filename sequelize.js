var Sequelize = require('sequelize');
const ProductosModel = require('./modelos/Productos');
const InventariosModel = require('./modelos/Inventarios');
const InventarioProductosModel = require('./modelos/InventarioProductos');

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

var Productos = ProductosModel(conexion,Sequelize);
var Inventarios = InventariosModel(conexion,Sequelize);
var InventarioProductos = InventarioProductosModel(conexion,Sequelize);


conexion.sync({force: true}).then(()=>{
    console.log('Tablas Creadas exitosamente!')
});

module.exports.Productos = Productos;
module.exports.Inventarios = Inventarios;
module.exports.InventarioProductos = InventarioProductos;