const userRoutes = require("express").Router();
const { auth } = require("../../middleware/auth");

const {
  createOneUser,
  getOneUser,
  getAllUsers,
  updateOneUser,
  deleteOneUser,
  userLogin,
} = require("../../controllers/user.controller");

userRoutes.post("/api/v1/createOneUser", createOneUser);
userRoutes.get("/api/v1/getOneUser/:id", auth, getOneUser);
userRoutes.get("/api/v1/getAllUsers", auth, getAllUsers);
userRoutes.delete("/api/v1/deleteOneUser/:id", auth, deleteOneUser);
userRoutes.put("/api/v1/updateOneUser/:id", auth, updateOneUser);
userRoutes.get("/api/v1/userLogin", auth, userLogin);

module.exports = userRoutes;
