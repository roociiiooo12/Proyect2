const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Patients = sequelize.define(
    "patients",
    {
        pacienteID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true    
        },
        nombre: {
            type: DataTypes.STRING,
        },
        apellidos: {
            type: DataTypes.STRING,
        },

        telefono: {
            type: DataTypes.INTEGER,
            
        },
        poblacion: {
            type: DataTypes.STRING,
           
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        updatedAt: false,
        timestamps: false
    }
);

module.exports = Patients;