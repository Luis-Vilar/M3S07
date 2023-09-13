const router = require('express').Router();
const userRoutes = require("./v1/user.routes");
const unidadesRoutes = require('./v1/unidades.routes');
const geracaoRoutes = require('./v1/geracao.routes');

router.use([unidadesRoutes, userRoutes, unidadesRoutes, geracaoRoutes]);

module.exports = router;
