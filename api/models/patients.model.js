const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Patients = sequelize.define(
    "patients",
    {
        pacienteID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        apellidos: {
            type: DataTypes.STRING,
        },

        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        poblacion: {
            type: DataTypes.STRING,
           
        },
    },
    {
        updatedAt: false,
        timestamps: false
    }
);

module.exports = Patients;