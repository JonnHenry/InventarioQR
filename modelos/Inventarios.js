module.exports = (conexion, Sequelize) => {
    const Inventarios = conexion.define('Inventarios', {
        codigoInventario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            onUpdate: 'CASCADE'
            // onDelete: 'CASCADE'
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
            onUpdate: 'CASCADE'
            // onDelete: 'CASCADE'
        },
        observacion: {
            type: Sequelize.STRING,
            defaultValue: 'Ninguno'
        }
    }, {
        timestamps: true
    });

    return Inventarios;
}