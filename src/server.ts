import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";

import { env } from "./config/env";
import { errorHandler } from "./middleware/error-handler";
import { userRoutes } from "./routes/user/user.routes";

const fastify = Fastify({
  logger: true,
});

// Register error handler
fastify.setErrorHandler(errorHandler);

// Register Swagger
await fastify.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Backend Template API",
      description: "API documentation for Backend Template",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
});

// Register Swagger UI
await fastify.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: true,
  },
});

// Register routes
await fastify.register(userRoutes, { prefix: "/api/users" });

// Health check endpoint
fastify.get("/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

// Run the server!
try {
  await fastify.listen({ port: env.PORT, host: "0.0.0.0" });
  fastify.log.info(`Server is running on port ${env.PORT}`);
}
catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
