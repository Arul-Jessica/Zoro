import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const requesttRouter = createTRPCRouter({
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
        Project: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const request = await ctx.db.request.create({
        data: {
          Project: {
            connect: {
              id: input.Project,
            },
          },
          User: {
            connect: {
              id: Number(ctx.session.user.id),
            },
          },
        },
      });

      return {
        success: true,
        message: "Request created successfully",
      };
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.request.delete({
        where: {
          id: input.id,
        },
      });
      return {
        success: true,
        message: "Request deleted successfully",
      };
    }),
});
