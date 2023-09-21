const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sua API",
      version: "1.0.0",
      description: "Documentação da API para o seu projeto",
    },
  },
  apis: [
    path.join(__dirname, "src/routes/v1/geracao.routes.js"), // Caminho para os arquivos de rota
        // Adicione mais caminhos de arquivo de rota, se necessário
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
