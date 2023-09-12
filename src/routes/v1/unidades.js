const unidadesRoutes = require("express").Router();
const { getUnidades, postUnidades, putUnidades, deleteUnidades } = require("../../controllers/unidades.js");

unidadesRoutes.get("/api/v1/unidade", getUnidades);
unidadesRoutes.post("/api/v1/unidade", postUnidades);
unidadesRoutes.put("/api/v1/unidade", putUnidades);
unidadesRoutes.delete("/api/v1/unidade", deleteUnidades);


module.exports = unidadesRoutes;