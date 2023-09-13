const  GeracaoMensal  = require("../models/geracaoMensal");

module.exports = {
    async getGeracao(req, res) {
        try {
            const geracao = await GeracaoMensal.findAll();
            return res.status(200).json(geracao);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
