const connection = require("../database/connection");
const { DataTypes } = require("sequelize");

const User = connection.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Este campo deve ser um email válido.",
        },
      },
      unique: {
        msg: "Email já cadastrado.",
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 20],
          msg: "Este campo deve ter entre 6 e 20 caracteres.",
        },
        is: {
          args: [
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*])[a-zA-Zd!@#$%^&*]{8,}$",
          ],
          msg: "Senha muito fraca",
        },
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { underscored: true, paranoid: true } //Serve para escrevermos no banco de dados em Snake Case,
  //podendo persistir o camelCase do JS
);

module.exports = {
  User,
};

/*
const Unidades = connection.define(
  "unidade",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nickname: DataTypes.STRING,
    address: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  },
  { underscored: false, paranoid: false }
);

module.exports = {
  Unidades,
};

*/
