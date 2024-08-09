import Fastify from "fastify";
import cors from "@fastify/cors"; // Import the updated package
import authRoutes from "./routes/authRoutes";
import { sequelize } from "./models"; // Import correctly

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "http://localhost:3000", // Adjust this to specify allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"],
});

fastify.register(authRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    fastify.log.info("Database connected successfully.");

    await fastify.listen({ port: 3001 });
    fastify.log.info("Server listening on http://localhost:3001");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
