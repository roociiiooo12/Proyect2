const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Doctors = sequelize.define(
    "doctors",
    {
        medicoID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
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
        role: {
            type: DataTypes.ENUM("Admin", "Doctor"),
            defaultValue: "Doctor"
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
//DEFINIR EL ROL DE ADMIN EN ESTE MODELO - HECHO

module.exports = Doctors;