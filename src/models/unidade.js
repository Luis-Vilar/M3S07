const connection = require("../database/connection");
const { DataTypes } = require("sequelize");

const Unidades = connection.define("unidade", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  nickname: DataTypes.STRING,
  address: DataTypes.STRING,
  brand: DataTypes.STRING,
  model: DataTypes.STRING,
  active: DataTypes.BOOLEAN
},
  { underscored: false, paranoid: false }
);

module.exports = {
  Unidades
};
