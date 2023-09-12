const { config } = require("dotenv");
const { verify } = require("jsonwebtoken");
config();

async function auth(request, response, next) {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(401).send({
        message: "Autenticação Falhou",
        cause: "Token não informado",
      });
    }
    request["payload"] = verify(authorization, process.env.SECRET_JWT);
    next();
  } catch (error) {
    return response.status(401).send({
      message: "Autenticação Falhou",
      cause: error.message,
    });
  }
}

module.exports = { auth };
