const unidadesRoutes = require("express").Router();
const {
  getUnidades,
  postUnidades,
  putUnidades,
  deleteUnidades,
} = require("../../controllers/unidades.controller.js");
const { auth } = require("../../middleware/auth.js");

unidadesRoutes.get("/api/v1/unidades", auth, getUnidades);
unidadesRoutes.post("/api/v1/unidades", auth, postUnidades);
unidadesRoutes.put("/api/v1/unidades/:id", auth, putUnidades);
unidadesRoutes.delete("/api/v1/unidades/:id", auth, deleteUnidades);
/**
 * @swagger
 * /api/v1/unidades:
 *   get:
 *     summary: Retorna todas as unidades.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     responses:
 *       200:
 *         description: Sucesso.
 *   post:
 *     summary: Cria uma nova unidade.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               address:
 *                 type: string
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               active:
 *                 type: boolean
 *             required:
 *               - nickname
 *               - address
 *               - brand
 *               - model
 *               - active
 *     responses:
 *       201:
 *         description: Unidade criada com sucesso.
 *
 * /api/v1/unidades/{id}:
 *   put:
 *     summary: Atualiza uma unidade existente.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da unidade a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               address:
 *                 type: string
 *               brand:
 *                 type: string
 *               model:
 *                 type: string
 *               active:
 *                 type: boolean
 *             required:
 *               - nickname
 *               - address
 *               - brand
 *               - model
 *               - active
 *     responses:
 *       200:
 *         description: Unidade atualizada com sucesso.
 *   delete:
 *     summary: Exclui uma unidade existente.
 *     security:
 *       - jwtAuth: []  # Autenticação JWT é necessária
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da unidade a ser excluída.
 *     responses:
 *       204:
 *         description: Unidade excluída com sucesso.
 */

module.exports = unidadesRoutes;

module.exports = unidadesRoutes;
