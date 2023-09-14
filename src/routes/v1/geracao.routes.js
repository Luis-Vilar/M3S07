const geracaoRoutes = require("express").Router();
const geracaoController = require("../../controllers/geracao.controller");
const { auth } = require("../../middleware/auth");

geracaoRoutes.get("/api/v1/geracao", auth, geracaoController.getGeracao);
geracaoRoutes.get("/api/v1/geracao/:unidadeId", auth ,geracaoController.getGeracaoUnidade);
geracaoRoutes.post("/api/v1/geracao", auth,  geracaoController.createGeracao);
geracaoRoutes.put("/api/v1/geracao/:id", auth , geracaoController.updateGeracao);
geracaoRoutes.delete("/api/v1/geracao/:id", auth , geracaoController.deleteGeracao);

module.exports = geracaoRoutes;

