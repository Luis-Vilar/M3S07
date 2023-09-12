module.exports = {
    async getUnidades(req, res) {
        res.json({
            message: "Unidades controller!",
            method: req.method,
            url: req.url,
            body: req.body,
            ip: req.ip,
            hostname: req.hostname,
        });
    },
    async postUnidades(req, res) {
        res.json({
            message: "Unidades controller!",
            method: req.method,
            url: req.url,
            body: req.body,
            ip: req.ip,
            hostname: req.hostname,
        });
    },
    async putUnidades(req, res) {
        res.json({
            message: "Unidades controller!",
            method: req.method,
            url: req.url,
            body: req.body,
            ip: req.ip,
            hostname: req.hostname,
        });
    },
    async deleteUnidades(req, res) {
        res.json({
            message: "Unidades controller!",
            method: req.method,
            url: req.url,
            body: req.body,
            ip: req.ip,
            hostname: req.hostname,
        });
    }
};