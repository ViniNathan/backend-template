import type { FastifyReply, FastifyRequest } from "fastify";

import type { CreateUserRequest, LoginRequest } from "../../types/auth/user.types";

import { userService } from "../../services/user/user.service";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export class UserController {
  async register(
    request: FastifyRequest<{ Body: CreateUserRequest }>,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const user = await userService.create(request.body);
      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
      });
      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
      });

      reply.code(201).send({
        user,
        accessToken,
        refreshToken,
      });
    }
    catch (error) {
      if (error instanceof Error) {
        reply.code(400).send({ error: error.message });
      }
      else {
        reply.code(500).send({ error: "An unexpected error occurred" });
      }
    }
  }

  async login(
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      const user = await userService.login(request.body);
      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
      });
      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
      });

      reply.code(200).send({
        user,
        accessToken,
        refreshToken,
      });
    }
    catch (error) {
      if (error instanceof Error) {
        reply.code(401).send({ error: error.message });
      }
      else {
        reply.code(500).send({ error: "An unexpected error occurred" });
      }
    }
  }

  async getProfile(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      if (!request.user) {
        reply.code(401).send({ error: "Unauthorized" });
        return;
      }

      const user = await userService.getById(request.user.userId);
      if (!user) {
        reply.code(404).send({ error: "User not found" });
        return;
      }

      reply.code(200).send({ user });
    }
    catch (error) {
      if (error instanceof Error) {
        reply.code(400).send({ error: error.message });
      }
      else {
        reply.code(500).send({ error: "An unexpected error occurred" });
      }
    }
  }

  async updateProfile(
    request: FastifyRequest<{ Body: { email?: string; password?: string; confirmPassword?: string; isActive?: boolean } }>,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      if (!request.user) {
        reply.code(401).send({ error: "Unauthorized" });
        return;
      }

      const user = await userService.updateById(request.user.userId, request.body);
      reply.code(200).send({ user });
    }
    catch (error) {
      if (error instanceof Error) {
        reply.code(400).send({ error: error.message });
      }
      else {
        reply.code(500).send({ error: "An unexpected error occurred" });
      }
    }
  }

  async deleteAccount(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    try {
      if (!request.user) {
        reply.code(401).send({ error: "Unauthorized" });
        return;
      }

      await userService.deleteById(request.user.userId);
      reply.code(204).send();
    }
    catch (error) {
      if (error instanceof Error) {
        reply.code(400).send({ error: error.message });
      }
      else {
        reply.code(500).send({ error: "An unexpected error occurred" });
      }
    }
  }
}

export const userController = new UserController();
