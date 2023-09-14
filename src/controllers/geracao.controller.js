const { GeracaoMensal } = require("../models/geracaoMensal");
const { Unidades } = require("../models/unidade.js");

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
      // Verifica se há registros de geração para a unidade
      const geracao = await GeracaoMensal.findAll({
        where: { unidade_id: unidadeId },
      });
      if (geracao.length === 0) {
        return res.status(400).json({
          error:
            "Não há registros de geração para esta unidade ou a unidade não existe",
        });
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
      // verificar se existe uma unidade com o id informado
      const unidade = await Unidades.findOne({
        where: {
          id: unidade_id,
        },
      });
      if (!unidade) {
        return res.status(400).json({ error: "Unidade não encontrada" });
      }

      // Convert unidade_id para um número
      const unidadeId = Number(unidade_id);

      // Convert reference_date para uma data
      const [year, month] = reference_date.split("-");
      if (!year || !month) {
        return res.status(400).json({ error: "Data inválida" });
      }
      if (month < 1 || month > 12) {
        return res.status(400).json({ error: "Mês inválido" });
      }

      if (year < 2023 || year > 2100) {
        return res.status(400).json({ error: "Ano inválido" });
      }
      const referenceDate = new Date(Date.UTC(Number(year), Number(month) - 1));

      // Verificar se já existe um registro com a mesma unidade_id e reference_date
      const geracaoExiste = await GeracaoMensal.findOne({
        where: { unidade_id: unidadeId, reference_date: referenceDate },
      });

      if (geracaoExiste) {
        return res.status(400).json({ error: "Registro já existe" });
      }

      // Se não existe um registro, criar um novo
      const geracao = await GeracaoMensal.create(req.body);
      return res.status(201).json(geracao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async updateGeracao(req, res) {
    try {
      const { id } = req.params;
      const { reference_date, total_generated } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Id inválido" });
      }

      if (!reference_date || !total_generated) {
        return res
          .status(400)
          .json({ error: "Preencha todos os campos obrigatórios" });
      }

      // Convert reference_date para uma data
      //Falta validar o formato da data (yyyy-mm)
      const [year, month] = reference_date.split("-");

      if (!year || !month) {
        return res.status(400).json({ error: "Data inválida" });
      }
      if (month < 1 || month > 12) {
        return res.status(400).json({ error: "Mês inválido" });
      }

      if (year < 2023 || year > 2100) {
        return res.status(400).json({ error: "Ano inválido" });
      }
      const referenceDate = new Date(Date.UTC(Number(year), Number(month) - 1));

      const geracao = await GeracaoMensal.findOne({
        where: { id: id },
      });

      if (!geracao) {
        return res.status(400).json({ error: "Registro não encontrado" });
      }

      // Atualizar o registro
      const updated = await GeracaoMensal.update(
        {
          reference_date: referenceDate,
          total_generated: total_generated,
        },
        { where: { id: id } }
      );

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
