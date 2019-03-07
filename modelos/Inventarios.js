module.exports = (conexion, Sequelize) => {
    const Inventarios = conexion.define('Inventarios', {
        codigoInventario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        nombre: {
            type: Sequelize.STRING
        },
        observacion: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: true
    });

    return Inventarios;
}