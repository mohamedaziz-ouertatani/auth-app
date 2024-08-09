import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/authService";

// Define the route generic interface
interface RegisterRequest {
  Body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
  };
}

interface LoginRequest {
  Body: {
    email: string;
    password: string;
  };
}

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/register",
    async (request: FastifyRequest<RegisterRequest>, reply: FastifyReply) => {
      try {
        const user = await AuthService.register(request.body);
        reply.status(201).send(user);
      } catch (error) {
        console.error("Registration error:", error);
        reply.status(400).send({ error: (error as Error).message });
      }
    }
  );

  fastify.post(
    "/login",
    async (request: FastifyRequest<LoginRequest>, reply: FastifyReply) => {
      try {
        const token = await AuthService.login(request.body);
        reply.status(200).send({ token });
      } catch (error) {
        console.error("Login error:", error);
        reply.status(400).send({ error: (error as Error).message });
      }
    }
  );
}
