const { Unidades } = require('../models/unidade.js'); // Importa o model de unidades

module.exports = {
    async getUnidades(req, res) {
        try {
            const unidades = await Unidades.findAll() // Busca todas as unidades
            return res.status(200).json({ unidades });       // Retorna as unidades em JSON

        } catch (error) {
            return res.status(400).json({ error: error.message }); // Retorna o erro
        }
    },
    async postUnidades(req, res) {
        console.log(req.body);
        try {
            const { nickname, address, brand, model, active } = req.body; // Pega os dados do corpo da requisição
            const unidade = await Unidades.create({ nickname, address, brand, model, active }); // Cria uma unidade com os dados do corpo da requisição
            return res.status(201).json({ unidade }); // Retorna a unidade criada em JSON

        } catch (error) {
            return res.status(400).json({ error: error.message }); // Retorna o erro
        }
    },
    async putUnidades(req, res) {
        try {
            const { id } = req.params; // Pega o id da unidade
            const { nickname, address, brand, model, active } = req.body; // Pega os dados do corpo da requisição
            const unidade = await Unidades.findByPk(id); // Busca a unidade pelo id
            if (!unidade) { // Se não encontrar a unidade
                return res.status(404).json({ error: "Unidade não encontrada!" }); // Retorna o erro
            }
            await unidade.update({ nickname, address, brand, model, active }); // Atualiza a unidade com os dados do corpo da requisição
            return res.status(200).json({ unidade }); // Retorna a unidade atualizada em JSON

        } catch (error) {
            return res.status(400).json({ error: error.message }); // Retorna o erro
        }

    },
    async deleteUnidades(req, res) {
        try {
            const { id } = req.params; // Pega o id da unidade
            console.log(req.params);
            const unidade = await Unidades.findByPk(id); // Busca a unidade pelo id
            if (!unidade) { // Se não encontrar a unidade
                return res.status(404).json({ error: "Unidade não encontrada!" }); // Retorna o erro
            }
            await unidade.destroy(); // Deleta a unidade
            return res.status(200).json({ message: "Unidade deletada com sucesso!" }); // Retorna a mensagem de sucesso
        } catch (error) {
            return res.status(400).json({ error: error.message }); // Retorna o erro
        }
    }
};