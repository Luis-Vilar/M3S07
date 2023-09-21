const geracaoRoutes = require("express").Router();
const geracaoController = require("../../controllers/geracao.controller");
const { auth } = require("../../middleware/auth");

/**
 * @swagger
 * /api/v1/geracao:
 *   get:
 *     summary: Retorna todas as gerações.
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       200:
 *         description: Sucesso.
 */
geracaoRoutes.get("/api/v1/geracao", auth, geracaoController.getGeracao);

/**
 * @swagger
 * /api/v1/geracao/{unidadeId}:
 *   get:
 *     summary: Retorna a geração de uma unidade específica.
 *     parameters:
 *       - in: path
 *         name: unidadeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da unidade.
 *     responses:
 *       200:
 *         description: Sucesso.
 */
geracaoRoutes.get("/api/v1/geracao/:unidadeId",geracaoController.getGeracaoUnidade);

/**
 * @swagger
 * /api/v1/geracao:
 *   post:
 *     summary: Cria uma nova geração.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               unidade_id:
 *                 type: integer
 *               reference_date:
 *                 type: string
 *                 format: date
 *               total_generated:
 *                 type: number
 *             required:
 *               - unidade_id
 *               - reference_date
 *               - total_generated
 *     responses:
 *       201:
 *         description: Geração criada com sucesso.
 */

geracaoRoutes.post("/api/v1/geracao", geracaoController.createGeracao);

/**
 * @swagger
 * /api/v1/geracao/{id}:
 *   put:
 *     summary: Atualiza uma geração existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da geração a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reference_date:
 *                 type: string
 *                 format: date
 *               total_generated:
 *                 type: number
 *             required:
 *               - reference_date
 *               - total_generated
 *     responses:
 *       200:
 *         description: Geração atualizada com sucesso.
 */

geracaoRoutes.put("/api/v1/geracao/:id", geracaoController.updateGeracao);

/**
 * @swagger
 * /api/v1/geracao/{id}:
 *   delete:
 *     summary: Exclui uma geração existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da geração a ser excluída.
 *     responses:
 *       204:
 *         description: Geração excluída com sucesso.
 */
geracaoRoutes.delete("/api/v1/geracao/:id", geracaoController.deleteGeracao);

module.exports = geracaoRoutes;
