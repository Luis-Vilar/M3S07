const router = require('express').Router();
const unidadesRoutes = require('./v1/unidades');

router.use([unidadesRoutes])

module.exports = router