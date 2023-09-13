const router = require('express').Router();
const userRoutes = require("./v1/user.routes");
const unidadesRoutes = require('./v1/unidades');
const geracaoRoutes = require('./v1/geracao.routes');

router.use(unidadesRoutes);
router.use(UserRoutes);
router.use(geracaoRoutes);
router.use([unidadesRoutes, userRoutes]);

module.exports = router;
