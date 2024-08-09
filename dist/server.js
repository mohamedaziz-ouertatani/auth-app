"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors")); // Import the updated package
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const models_1 = require("./models"); // Import correctly
const fastify = (0, fastify_1.default)({ logger: true });
fastify.register(cors_1.default, {
    origin: "http://localhost:3000", // Adjust this to specify allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"],
});
fastify.register(authRoutes_1.default);
const start = async () => {
    try {
        await models_1.sequelize.authenticate();
        fastify.log.info("Database connected successfully.");
        await fastify.listen({ port: 3001 });
        fastify.log.info("Server listening on http://localhost:3001");
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();
