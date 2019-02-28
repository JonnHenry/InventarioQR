module.exports = async (conexion, Sequelize) => {
    const Inventario_Productos = await conexion.define('INVENTARIO_PRODUCTOS', {
        codInventario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Inventarios',
                key: 'codigoInventario'
            }
        },
        codProducto : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Productos',
                key: 'codigoProducto'
            }
        },
        cantidad : {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {timestamps: false});
    return Inventario_Productos;
}