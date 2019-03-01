module.exports = async (conexion, Sequelize) => {
    const Inventarios = await conexion.define('Inventarios',{
        codigoInventario: {
            type : Sequelize.INTEGER, 
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        observacion: {
            type : Sequelize.STRING 
        }   
    });
    return Inventarios;
}