import { z } from "zod";
import argon2 from "argon2";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const techStackRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const techStack = await ctx.db.techStack.create({
        data: {
          name: input.name,
        },
      });
      return {
        success: true,
        message: "TechStack created successfully",
      };
    }),
});
