module.exports = (conexion, Sequelize) => {
    const Productos = conexion.define('Productos', {
        codigoProducto: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false

        },
        descripcion: {
            type: Sequelize.STRING,
            defaultValue: "Ninguna"
        }
    }, {
        timestamps: true
    });
    return Productos;
}