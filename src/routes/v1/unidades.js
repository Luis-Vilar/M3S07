const unidadesRoutes = require("express").Router();
const { getUnidades, postUnidades, putUnidades, deleteUnidades } = require("../../controllers/unidades.js");

unidadesRoutes.get("/api/v1/unidades", getUnidades);
unidadesRoutes.post("/api/v1/unidades", postUnidades);
unidadesRoutes.put("/api/v1/unidades/:id", putUnidades);
unidadesRoutes.delete("/api/v1/unidades/:id", deleteUnidades);


module.exports = unidadesRoutes;