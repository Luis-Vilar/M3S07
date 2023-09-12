const router = require('express').Router();
const UserRoutes = require("./v1/user.routes");

router.use([UserRoutes])

module.exports = router