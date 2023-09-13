const { User } = require("../models/user");
const { sign } = require("jsonwebtoken");
const { config } = require("dotenv");
var validaEmail = require("../utils/validators");
config();

class UserController {
  async login(request, response) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return response.status(404).send({
          message: "Usuário não encontrado!",
        });
      }

      if (user.password !== password) {
        return response.status(401).send({
          message: "Senha incorreta!",
        });
      }

      const payload = { email: user.email };
      const token = sign(payload, process.env.SECRET_JWT);
      return response.status(200).send({
        token: token,
        message: "Login realizado com sucesso!",
      });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao realizar o login!",
        error: error.message,
      });
    }
  }

  async getAllUsers(request, response) {
    try {
      const data = await User.findAll({
        order: [["id", "ASC"]],
      });
      return response.status(200).send(data);
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao listar os usuários",
        error: error.message,
      });
    }
  }

  async createUser(request, response) {
    try {
      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        return response.status(400).send({
          message: "Todos os campos são obrigatórios!",
        });
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        return response.status(403).send({
          message: "E-mail já cadastrado!",
        });
      }

      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!regex.test(email)) {
        return response.status(403).send({
          message:
            "Formato de e-mail incorreto. Entre com um e-mail válido, ex: name@example.com!",
        });
      }

      const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{8,}$/;
      if (!regexPassword.test(password)) {
        return response.status(403).send({
          message:
            "A senha deve ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 letra maiúscula, 1 número e 1 caractere especial",
        });
      }

      const data = await User.create({
        name,
        email,
        password,
      });

      return response
        .status(201)
        .send({ data, message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao criar o usuário",
        error: error.message,
      });
    }
  }

  async updateUser(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return response.status(400).send({
          message: "Usuário não encontrado!",
        });
      }

      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        return response.status(400).send({
          message: "Entre com todos os dados para serem alterados!",
        });
      }

      const mail = await User.findOne({
        where: {
          email,
        },
      });

      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!regex.test(email)) {
        return response.status(403).send({
          message:
            "Formato de e-mail incorreto. Entre com um e-mail válido, ex: name@example.com!",
        });
      }
      
      const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{8,}$/;
      if (!regexPassword.test(password)) {
        return response.status(403).send({
          message:
            "A senha deve ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 letra maiúscula, 1 número e 1 caractere especial",
        });
      }

      const data = await User.update(
        {
          name,
          email,
          password,
        },
        {
          where: {
            id,
          },
        }
      );

      return response
        .status(200)
        .send({ data, message: "Dados atualizados com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Impossível atualizar as informações!",
        error: error.message,
      });
    }
  }

  async deleteUser(request, response) {
    try {
      const { id } = request.params;
      const user = await User.destroy({
        where: {
          id,
        },
      });

      if (!user) {
        return response.status(400).send({
          message: `Usuário com o ID ${id} não encontrado!`,
        });
      }

      return response
        .status(204)
        .send({ message: "Usuário excluído com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Impossível excluir o usuario!",
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
