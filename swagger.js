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

// Personalize o título "Default" aqui
delete swaggerSpec.paths.default;

//Usuarios
swaggerSpec.paths["/api/v1/login"]["post"]["tags"] = ["Usuários"];
swaggerSpec.paths["/api/v1/usuario"]["get"]["tags"] = ["Usuários"];
swaggerSpec.paths["/api/v1/usuario"]["post"]["tags"] = ["Usuários"];
swaggerSpec.paths["/api/v1/usuario/{id}"]["put"]["tags"] = ["Usuários"];
swaggerSpec.paths["/api/v1/usuario/{id}"]["delete"]["tags"] = ["Usuários"];

// Personalize o título "Default" aqui unidades
swaggerSpec.paths["/api/v1/unidades"]["get"]["tags"] = ["Unidades"];
swaggerSpec.paths["/api/v1/unidades"]["post"]["tags"] = ["Unidades"];
swaggerSpec.paths["/api/v1/unidades/{id}"]["put"]["tags"] = ["Unidades"];
swaggerSpec.paths["/api/v1/unidades/{id}"]["delete"]["tags"] = ["Unidades"];

// Personalize o título "Default" aqui
swaggerSpec.paths["/api/v1/geracao"]["get"]["tags"] = ["Geração"]; 
swaggerSpec.paths["/api/v1/geracao"]["post"]["tags"] = ["Geração"]; 
swaggerSpec.paths["/api/v1/geracao/{unidadeId}"]["get"]["tags"] = ["Geração"];
swaggerSpec.paths["/api/v1/geracao/{id}"]["put"]["tags"] = ["Geração"];
swaggerSpec.paths["/api/v1/geracao/{id}"]["delete"]["tags"] = ["Geração"];

module.exports = swaggerSpec;
