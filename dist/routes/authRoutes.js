"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const authService_1 = require("../services/authService");
async function authRoutes(fastify) {
    fastify.post("/register", async (request, reply) => {
        try {
            const user = await authService_1.AuthService.register(request.body);
            reply.status(201).send(user);
        }
        catch (error) {
            console.error("Registration error:", error);
            reply.status(400).send({ error: error.message });
        }
    });
    fastify.post("/login", async (request, reply) => {
        try {
            const token = await authService_1.AuthService.login(request.body);
            reply.status(200).send({ token });
        }
        catch (error) {
            console.error("Login error:", error);
            reply.status(400).send({ error: error.message });
        }
    });
}
