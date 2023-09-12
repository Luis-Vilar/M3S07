const { connection } = require("../database/connection");
const { INTEGER, STRING, DATE } = require("sequelize");

const User = connection.define(
  "User",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
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
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 20],
          msg: "Este campo deve ter entre 6 e 20 caracteres.",
        },
        is: {
          args: [
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$",
          ],
          msg: "Senha muito fraca",
        },
      },
    },
    createdAt: DATE,
    updatedAt: DATE,
  },
  { underscored: true, paranoid: true } //Serve para escrevermos no banco de dados em Snake Case,
  //podendo persistir o camelCase do JS
);

module.exports = {
  User,
};
