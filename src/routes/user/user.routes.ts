import type { FastifyInstance } from "fastify";

import { userController } from "../../controllers/user/user.controller";
import { createUserSchema, loginUserSchema } from "../../schemas/user/user.schemas";
import { authenticateToken } from "../../utils/jwt";

export async function userRoutes(fastify: FastifyInstance): Promise<void> {
  // Public routes
  fastify.post("/register", {
    schema: {
      description: "Register a new user",
      tags: ["Authentication"],
      body: {
        type: "object",
        required: ["email", "password", "confirmPassword"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
          confirmPassword: { type: "string", minLength: 8 },
        },
      },
      response: {
        201: {
          description: "User successfully registered",
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                isActive: { type: "boolean" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
          },
        },
      },
    },
    handler: userController.register.bind(userController),
  });

  fastify.post("/login", {
    schema: {
      description: "Login with email and password",
      tags: ["Authentication"],
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
        },
      },
      response: {
        200: {
          description: "Successfully logged in",
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                isActive: { type: "boolean" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
          },
        },
      },
    },
    handler: userController.login.bind(userController),
  });

  // Protected routes
  fastify.get("/profile", {
    preHandler: authenticateToken,
    schema: {
      description: "Get current user profile",
      tags: ["User"],
      security: [{ bearerAuth: [] }],
      response: {
        200: {
          description: "User profile",
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                isActive: { type: "boolean" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: userController.getProfile.bind(userController),
  });

  fastify.patch("/profile", {
    preHandler: authenticateToken,
    schema: {
      description: "Update current user profile",
      tags: ["User"],
      security: [{ bearerAuth: [] }],
      body: {
        type: "object",
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 8 },
          confirmPassword: { type: "string", minLength: 8 },
          isActive: { type: "boolean" },
        },
      },
      response: {
        200: {
          description: "Updated user profile",
          type: "object",
          properties: {
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                email: { type: "string" },
                isActive: { type: "boolean" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: userController.updateProfile.bind(userController),
  });

  fastify.delete("/profile", {
    preHandler: authenticateToken,
    schema: {
      description: "Delete current user account",
      tags: ["User"],
      security: [{ bearerAuth: [] }],
      response: {
        204: {
          description: "Account successfully deleted",
          type: "null",
        },
      },
    },
    handler: userController.deleteAccount.bind(userController),
  });
}
