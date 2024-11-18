const { sequelize } = require("../../database");
const { DataTypes } = require("sequelize");

const Medications = sequelize.define(
    "medications",
    {
        medicamentoID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        efectoSecundario: {
            type: DataTypes.STRING,
        },
        tipo: {
            type: DataTypes.STRING,
        },
        

    },
    { 
        updatedAt: false,
        timestamps:false
     }
);

module.exports = Medications;