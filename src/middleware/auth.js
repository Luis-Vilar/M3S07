const { config } = require("dotenv");
const { verify } = require("jsonwebtoken");
config();

async function auth(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({
        message: "Autenticação Falhou",
        cause: "Token não informado",
      });
    }
    req["payload"] = verify(authorization, process.env.SECRET_JWT);
    console.log(req["payload"]);
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Autenticação Falhou",
      cause: error.message,
    });
  }
}

module.exports = { auth };
