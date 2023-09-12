const router = require('express').Router();
const UserRoutes = require("./v1/user.routes");
const unidadesRoutes = require('./v1/unidades');
const geracaoRoutes = require('./v1/geracao.routes');

router.use([unidadesRoutes, UserRoutes])
router.use([geracaoRoutes])

module.exports = router