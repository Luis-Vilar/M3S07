const geracaoRoutes = require("express").Router();
const geracaoController = require("../../controllers/geracao.controller");

geracaoRoutes.get("/api/v1/geracao", geracaoController.getGeracao);

module.exports = geracaoRoutes;

