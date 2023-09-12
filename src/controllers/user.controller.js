const { User } = require("../models/user");
const { sign } = require("jsonwebtoken");
const { config } = require("dotenv");
config();

class UserController {
  async createOneUser(request, response) {
    try {
      const { userId, name, email, password } = request.body;

      if (!userId || !name || !email || !email || !password) {
        return response.status(400).send({
          message: "Todos os campos são obrigatórios!",
        });
      }

      const data = await User.create({
        userId,
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
        message: "Erro ao criar o Usuário",
        error: error.message,
      });
    }
  }

  async getOneUser(request, response) {
    try {
      const { id } = request.params;
      const data = await User.findByPk(id);
      return response.status(200).send(data);
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao listar o Usuário",
        error: error.message,
      });
    }
  }

  async getAllUsers(request, response) {
    try {
      const data = await Trainee.findAll({
        order: [["id", "ASC"]],
      });
      return response.status(200).send(data);
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao listar os Usuários",
        error: error.message,
      });
    }
  }

  async updateOneUser(request, response) {
    try {
      const { id } = request.params;
      const { userId, name, email, password } = request.body;

      await User.update(
        {
          userId,
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
        .status(201)
        .send({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Erro ao criar o Usuário",
        error: error.message,
      });
    }
  }

  async deleteOneUser(request, response) {
    try {
      const { id } = request.params;
      await User.destroy({
        where: {
          id,
        },
      });

      return response
        .status(204)
        .send({ message: "Usuário excluído com sucesso!" });
    } catch (error) {
      console.error(error.message);
      return response.status(400).send({
        message: "Impossível excluir o usuário!",
        error: error.message,
      });
    }
  }

  async userLogin(request, response) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({
        where: {
          email,
          password,
        },
      });

      if (!user) {
        return response.status(400).send({
          message: "Usuário ou senha inválidos!",
        });
      }
      const payload = {"email" : user.email};
      const token = sign(payload, process.env.SECRET_JWT, { expiresIn: "1h" });
      return response.status(200).send({
        "token": token,
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
}

module.exports = new UserController();
