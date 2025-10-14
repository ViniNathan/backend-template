import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8),
  }),
});
