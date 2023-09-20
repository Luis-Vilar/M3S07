const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "API documentation for your project",
    },
  },
  apis: ["./routes/*.js"], // Path to your API routes
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
