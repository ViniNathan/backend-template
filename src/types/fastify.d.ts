import "fastify";

import type { JwtPayload } from "../utils/jwt";

declare module "fastify" {
  interface FastifyRequest {
    user?: JwtPayload;
  }
}
