import type { FastifyReply, FastifyRequest } from "fastify";
import type { SignOptions } from "jsonwebtoken";

import jwt from "jsonwebtoken";

import { env } from "../config/env";

export interface JwtPayload {
  userId: string;
  email: string;
}

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as SignOptions);
}

export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  }
  catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      reply.code(401).send({ error: "Missing or invalid authorization header" });
      return;
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    request.user = payload;
  }
  catch (error) {
    reply.code(401).send({ error: "Invalid or expired token" });
  }
}
