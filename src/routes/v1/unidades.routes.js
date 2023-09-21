const unidadesRoutes = require("express").Router();
const { getUnidades, postUnidades, putUnidades, deleteUnidades } = require("../../controllers/unidades.controller.js");
const { auth } = require("../../middleware/auth.js");

/**
 * @swagger
 * /api/v1/unidades:
 *  get:
 *   summary: Retorna todas as unidades.
 *  responses:
 *  200:
 *  description: Sucesso.
 */
unidadesRoutes.get("/api/v1/unidades", auth, getUnidades);
unidadesRoutes.post("/api/v1/unidades", auth, postUnidades);
unidadesRoutes.put("/api/v1/unidades/:id", auth, putUnidades);
unidadesRoutes.delete("/api/v1/unidades/:id", auth, deleteUnidades);


module.exports = unidadesRoutes;