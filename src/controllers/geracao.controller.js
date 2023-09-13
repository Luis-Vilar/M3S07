const GeracaoMensal = require("../models/geracaoMensal");

module.exports = {
  async getGeracao(req, res) {
    try {
      const geracao = await GeracaoMensal.findAll();
      return res.status(200).json(geracao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getGeracaoUnidade(req, res) {
    try {
      const { unidadeId } = req.params;
      const geracao = await GeracaoMensal.findAll({
        where: { unidade_id: unidadeId },
      });
      if (!geracao) {
        return res.status(400).json({ error: "Unidade não encontrada" });
      }
      return res.status(200).json(geracao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async createGeracao(req, res) {
    try {
      const { unidade_id, reference_date, total_generated } = req.body;
      
      if (!unidade_id || !reference_date || !total_generated) {
        return res
          .status(400)
          .json({ error: "Preencha todos os campos obrigatórios" });
      }
      const geracao = await GeracaoMensal.create(req.body);
      return res.status(201).json(geracao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updateGeracao(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await GeracaoMensal.update(req.body, {
        where: { id: id },
      });
      if (updated) {
        const updatedGeracao = await GeracaoMensal.findOne({
          where: { id: id },
        });
        return res.status(200).json(updatedGeracao);
      }
      throw new Error("Registro não encontrado");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async deleteGeracao(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Id inválido" });
      }
      const deleted = await GeracaoMensal.destroy({
        where: { id: id },
      });
      if (deleted) {
        return res.status(204).send("Registro deletado");
      }
      throw new Error("Registro não encontrado");
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
