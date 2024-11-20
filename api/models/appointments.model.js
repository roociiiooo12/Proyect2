const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Appointments = sequelize.define(
    "appointments",
    {
       citaID: {
           type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
            
        },  
        pacienteID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        medicoID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('Programada','Completada', 'Cancelada'),
            allowNull: false
        }
    },
    { 
        timestamps:false
     } 
);

module.exports = Appointments; 
