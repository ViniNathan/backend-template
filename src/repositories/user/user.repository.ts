import type { User } from "../../../generated/prisma";
import type { CreateUserRequest, UpdateUserRequest, UserPublic } from "../../types/auth/user.types";

import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient();

export class UserRepository {
  private mapToPublic(user: User): UserPublic {
    return {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(input: CreateUserRequest): Promise<UserPublic> {
    const { email, password } = input;
    const user = await prisma.user.create({
      data: { email, password },
    });
    return this.mapToPublic(user);
  }

  async getById(id: string): Promise<UserPublic | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? this.mapToPublic(user) : null;
  }

  async getByEmail(email: string): Promise<UserPublic | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? this.mapToPublic(user) : null;
  }

  async getWithPasswordByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async updateById(id: string, data: UpdateUserRequest): Promise<UserPublic> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return this.mapToPublic(user);
  }

  async deleteById(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}

export const userRepository = new UserRepository();
