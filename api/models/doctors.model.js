const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Doctors = sequelize.define(
    "doctors",
    {
       /*  medicoID: {
            type: DataTypes.INTEGER,
             allowNull: false,
        }, */
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        especialidad: {
            type: DataTypes.STRING,
        },
    },
    { 
        updatedAt: false,
        timestamps: false 

    }
);

module.exports = Doctors;