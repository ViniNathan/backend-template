import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  request.log.error(error);

  // Validation errors (from Zod or Fastify schemas)
  if (error.validation) {
    reply.code(400).send({
      error: "Validation Error",
      message: error.message,
      details: error.validation,
    });
    return;
  }

  // Custom application errors
  if (error.statusCode) {
    reply.code(error.statusCode).send({
      error: error.name,
      message: error.message,
    });
    return;
  }

  // Default to 500 for unknown errors
  reply.code(500).send({
    error: "Internal Server Error",
    message: "An unexpected error occurred",
  });
}
