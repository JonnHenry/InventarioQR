module.exports = (conexion, Sequelize) => {
    const Inventarios = conexion.define('Inventarios',{
        codigo: {
            type : Sequelize.INTEGER, 
            primaryKey: true,
            unique: true,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        observacion : {
            type : Sequelize.STRING 
        }   
    });
    return Inventarios;
}