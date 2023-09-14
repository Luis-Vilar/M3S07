const connection = require("../database/connection");
const { DataTypes } = require("sequelize");

const Unidades = connection.define("unidade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  nickname: {type : DataTypes.STRING, allowNull: false},
  address: {type : DataTypes.STRING, allowNull: false},
  brand: {type : DataTypes.STRING, allowNull: false},
  model: {type : DataTypes.STRING, allowNull: false},
  active:{type : DataTypes.BOOLEAN, allowNull: false}
},
  { underscored: false, paranoid: false }
);

module.exports = {
  Unidades
};
