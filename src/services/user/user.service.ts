import bcrypt from "bcryptjs";

import type { CreateUserRequest, LoginRequest, UpdateUserRequest, UserPublic } from "../../types/auth/user.types";

import { userRepository } from "../../repositories/user/user.repository";

export class UserService {
  private readonly passwordSaltRounds = 12;

  private assertPasswordsMatch(password: string, confirmPassword: string): void {
    if (password !== confirmPassword)
      throw new Error("Passwords do not match");
  }

  private async hashPassword(plain: string): Promise<string> {
    return await bcrypt.hash(plain, this.passwordSaltRounds);
  }

  async create(input: CreateUserRequest): Promise<UserPublic> {
    this.assertPasswordsMatch(input.password, input.confirmPassword);

    const existing = await userRepository.getByEmail(input.email);
    if (existing)
      throw new Error("Email already in use");

    const passwordHash = await this.hashPassword(input.password);
    return await userRepository.create({
      email: input.email,
      password: passwordHash,
      confirmPassword: input.confirmPassword,
    });
  }

  async login(input: LoginRequest): Promise<UserPublic> {
    const userWithPassword = await userRepository.getWithPasswordByEmail(input.email);
    if (!userWithPassword)
      throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(input.password, userWithPassword.password);
    if (!isValid)
      throw new Error("Invalid credentials");

    return {
      id: userWithPassword.id,
      email: userWithPassword.email,
      isActive: userWithPassword.isActive,
      createdAt: userWithPassword.createdAt,
      updatedAt: userWithPassword.updatedAt,
    } satisfies UserPublic;
  }

  async getById(id: string): Promise<UserPublic | null> {
    return await userRepository.getById(id);
  }

  async getByEmail(email: string): Promise<UserPublic | null> {
    return await userRepository.getByEmail(email);
  }

  async updateById(id: string, data: UpdateUserRequest & { confirmPassword?: string }): Promise<UserPublic> {
    const updateData: UpdateUserRequest = { ...data };

    if (data.password) {
      if (!data.confirmPassword)
        throw new Error("confirmPassword is required when updating password");
      this.assertPasswordsMatch(data.password, data.confirmPassword);
      updateData.password = await this.hashPassword(data.password);
    }

    return await userRepository.updateById(id, updateData);
  }

  async deleteById(id: string): Promise<void> {
    await userRepository.deleteById(id);
  }
}

export const userService = new UserService();
