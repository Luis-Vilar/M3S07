const router = require('express').Router();
const UserRoutes = require("./v1/user.routes");
const unidadesRoutes = require('./v1/unidades');

router.use([unidadesRoutes, UserRoutes])

module.exports = router