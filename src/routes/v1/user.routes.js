const userRoutes = require("express").Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
} = require("../../controllers/user.controller");
const { auth } = require("../../middleware/auth");

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Fazer login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 */
userRoutes.post("/api/v1/login", login);


/**
 * @swagger
 * /api/v1/usuario:
 *   get:
 *     summary: Retorna todos os usuários.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     responses:
 *       200:
 *         description: Sucesso.
 */
userRoutes.get("/api/v1/usuario", auth, getAllUsers);


/**
 * @swagger
 * /api/v1/usuario:
 *   get:
 *     summary: Retorna todos os usuários.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     responses:
 *       200:
 *         description: Sucesso.
 *   post:
 *     summary: Cria um novo usuário.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 */
userRoutes.post("/api/v1/usuario", createUser);

/**
 * @swagger
 * /api/v1/usuario/{id}:
 *   put:
 *     summary: Atualiza um usuário existente.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 */

userRoutes.put("/api/v1/usuario/:id", auth, updateUser);

/**
 * @swagger
 * /api/v1/usuario/{id}:
 *   delete:
 *     summary: Exclui um usuário existente.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser excluído.
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso.
 */
userRoutes.delete("/api/v1/usuario/:id", auth, deleteUser);

module.exports = userRoutes;
