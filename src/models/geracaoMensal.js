const  connection  = require("../database/connection");
const { INTEGER, DATE } = require("sequelize");

const GeracaoMensal = connection.define("geracoes", {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    // Somente mes e ano
    reference_date: {
        type: DATE,
        allowNull: false,
    },
    total_generated: {
        type: INTEGER,
        allowNull: true,
    },
    unidade_id: {
        type: INTEGER,
        allowNull: false,
        references: {
          model: "unidades", // Nome da tabela de referência
          key: "id", // Nome da coluna de referência na tabela 'unidades'
        },
    },
    createdAt: DATE,
    updatedAt: DATE,
},
{ underscored: true, paranoid: true } 
);

module.exports = {GeracaoMensal}

