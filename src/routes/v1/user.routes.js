const userRoutes = require("express").Router();
const { auth } = require("../../middleware/auth");

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} = require("../../controllers/user.controller");

userRoutes.get("/api/v1/login", login);
userRoutes.get("/api/v1/usuario", auth, getAllUsers);

userRoutes.post("/api/v1/usuario", auth, createUser);
userRoutes.put("/api/v1/usuario/:id", auth, updateUser);


userRoutes.delete("/api/v1/usuario/:id", auth, deleteUser);


module.exports = userRoutes;
