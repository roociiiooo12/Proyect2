const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Appointments = sequelize.define(
    "appointments",
    {
        citaID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pacienteID: {
            type: DataTypes.INTEGER,
        },
        medicoID: {
            type: DataTypes.INTEGER,
        },

        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        hora: {
            type: DataTypes.TIME, 
            defaultValue: new Date(),
        },
        motivo: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM('Programada','Cmpletada', 'Cancelada')
        }
    },
    { 
        updatedAt: false,
        timestamps:false
     } 
);

module.exports = Appointments; 
