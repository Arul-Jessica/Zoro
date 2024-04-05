import { z } from "zod";
import argon2 from "argon2";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import Login from "~/app/login/page";

export const userRouter = createTRPCRouter({
  Login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(22),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }
      if (!(await argon2.verify(user.hashedPassword, input.password))) {
        return {
          success: false,
          message: "Invalid password",
        };
      }
      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        regno: z.number(),
        dept: z.string(),
        email: z.string().email(),
        password: z.string().min(8).max(22),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
          regno: input.regno,
        },
      });
      if (user) {
        return {
          success: false,
          message: "User already exists",
        };
      }
      const password = await argon2.hash(input.password);
      user = await ctx.db.user.create({
        data: {
          name: input.name,
          regno: input.regno,
          dept: input.dept,
          email: input.email,
          hashedPassword: password,
        },
      });
      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    }),
});
