module.exports = (conexion, Sequelize) => {
    const Inventario_Productos = conexion.define('InventarioProductos', {
        codInventario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Inventarios',
                key: 'codigoInventario'
            }
        },
        codProducto: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Productos',
                key: 'codigoProducto'
            }
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true
    })
    return Inventario_Productos;
}