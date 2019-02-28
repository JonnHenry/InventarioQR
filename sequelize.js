var Sequelize = require('sequelize');
var sequelize = new Sequelize('InventarioQR', 'jonnathan@inventarioqr', 'Jhca19960121', {
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

sequelize.sync().then(()=>{
    console.log('Tablas Creadas exitosamente!')
});
