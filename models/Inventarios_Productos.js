module.exports = (conexion, Sequelize) => {
    const Inventario_Productos = conexion.define('Inventario_Productos', {
        cod_inventario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Inventarios',
                key: 'codigo',
                as: 'cod_inventario'
            }
        },
        cod_producto : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Productos',
                key: 'codigo',
                as: 'cod_producto'
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