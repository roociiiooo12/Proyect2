const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Prescriptions = sequelize.define(
    "prescriptions",
    {
        recetaID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pacienteID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcions: {
            type: DataTypes.STRING,
        },
    },
    {
        updatedAt: false,
        timestamps: false

    }
);

module.exports = Prescriptions;