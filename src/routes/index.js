const router = require('express').Router();
const userRoutes = require("./v1/user.routes");
const unidadesRoutes = require('./v1/unidades');

router.use([unidadesRoutes, userRoutes]);

module.exports = router