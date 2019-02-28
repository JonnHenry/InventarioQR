module.exports = async (conexion, Sequelize) => {
    const Productos = await conexion.define('PRODUCTOS', {
        codigoProducto : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        descripcion : {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Productos;
} 