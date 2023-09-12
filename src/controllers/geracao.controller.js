const { GeracaoMensal } = require("../models/geracaoMensal");

class GeracaoController {
    async getGeracao(req, res) {
        try {
            const geracoes = await GeracaoMensal.findAll();
            return res.status(200).json(geracoes);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = {
    GeracaoController
};