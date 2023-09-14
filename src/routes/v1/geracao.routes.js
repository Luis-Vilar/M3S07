const geracaoRoutes = require("express").Router();
const geracaoController = require("../../controllers/geracao.controller");
const { auth } = require("../../middleware/auth");

geracaoRoutes.get("/api/v1/geracao", geracaoController.getGeracao);
geracaoRoutes.get("/api/v1/geracao/:unidadeId" ,geracaoController.getGeracaoUnidade);
geracaoRoutes.post("/api/v1/geracao",  geracaoController.createGeracao);
geracaoRoutes.put("/api/v1/geracao/:id" , geracaoController.updateGeracao);
geracaoRoutes.delete("/api/v1/geracao/:id" , geracaoController.deleteGeracao);

module.exports = geracaoRoutes;

