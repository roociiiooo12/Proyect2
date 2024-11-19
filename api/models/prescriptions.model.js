const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Prescriptions = sequelize.define(
    "prescriptions",
    {
        recetaID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
         pacienteID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        fecha: {
            type: DataTypes.DATEONLY,
        }
    },
    {
        updatedAt: false,
        timestamps: false

    }
);

module.exports = Prescriptions;