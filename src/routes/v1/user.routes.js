const { Router } = require("express");
const { auth } = require("../../middleware/auth");

const {
  createOneUser,
  getOneUser,
  getAllUsers,
  updateOneUser,
  deleteOneUser,
  userLogin,
} = require("../../controllers/user.controller");

class UserRoutes {
  routesFromUser() {
    const userRoutes = Router();
    userRoutes.post("/createOneUser", createOneUser);
    userRoutes.get("/getOneUser/:id", auth, getOneUser);
    userRoutes.get("/getAllUsers", auth, getAllUsers);
    userRoutes.delete("/deleteOneUser/:id", auth, deleteOneUser);
    userRoutes.put("/updateOneUser/:id", auth, updateOneUser);
    userRoutes.get("/userLogin", auth, userLogin);
    return userRoutes;
  }
}

module.exports = new UserRoutes();
