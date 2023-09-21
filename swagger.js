const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path"); // Importe o módulo 'path' aqui

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Solar Energy",
      version: "1.0.0",
      description: "Documentação da API para o seu projeto Solar Energy",
    },
    components: {
      securitySchemes: {
        jwtAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    path.join(__dirname, "src/routes/v1/*.js"),
    path.join(__dirname, "src/models/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
