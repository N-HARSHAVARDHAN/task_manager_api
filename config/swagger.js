import swaggerJsdoc from "swagger-jsdoc";
import env from "./env.js";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "API documentation for Task Manager"
        },

        servers: [
            {
                url: env.swagger.serverUrl
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;