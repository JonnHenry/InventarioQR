module.exports = (conexion, Sequelize) => {
    const Productos = conexion.define('Productos', {
        codigo : {
            type: Sequelize.STRING,
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