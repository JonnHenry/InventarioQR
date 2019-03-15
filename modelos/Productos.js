module.exports = (conexion, Sequelize) => {
    const Productos = conexion.define('Productos', {
        codigoProducto: {
            primaryKey: true,
            allowNull: false,
            type: Sequelize.INTEGER,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        observacion: {
            type: Sequelize.STRING,
            defaultValue: "Ninguna"
        }
    }, {
        timestamps: true
    });
    return Productos;
}