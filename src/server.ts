import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
// Import the framework and instantiate it
import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

// Register Swagger
fastify.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Backend Template API",
      description: "API documentation for Backend Template",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
});

// Register Swagger UI
fastify.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: true,
  },
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
}
catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
