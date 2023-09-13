const unidadesRoutes = require("express").Router();
const { getUnidades, postUnidades, putUnidades, deleteUnidades } = require("../../controllers/unidades.controller.js");
const { auth } = require("../../middleware/auth.js");

unidadesRoutes.get("/api/v1/unidades", auth, getUnidades);
unidadesRoutes.post("/api/v1/unidades", auth, postUnidades);
unidadesRoutes.put("/api/v1/unidades/:id", auth, putUnidades);
unidadesRoutes.delete("/api/v1/unidades/:id", auth, deleteUnidades);


module.exports = unidadesRoutes;