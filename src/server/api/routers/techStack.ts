import { z } from "zod";
import argon2 from "argon2";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const techStackRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    let techStacks = await ctx.db.techStack.findMany({
      select: { id: true, name: true },
    });
    return {
      success: true,
      techstacks: techStacks,
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
