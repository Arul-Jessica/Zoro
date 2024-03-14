import { z } from "zod";
import argon2 from "argon2";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        domain: z.string().min(1),
        techStack: z.string().min(1),
        description: z.string().min(1),
        gitl: z.string().min(1).url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let project = await ctx.db.project.findUnique({
        where: {
          title: input.title,
        },
      });
      if (project) {
        return {
          success: false,
          message: "Title already exists , enter new title",
        };
      }
      let projectgit = await ctx.db.project.findUnique({
        where: {
          gitl: input.gitl,
        },
      });
      if (projectgit) {
        return {
          success: false,
          message: "Gitl already exists , enter new gitl",
        };
      }
      project = await ctx.db.project.create({
        data: {
          title: input.title,
          domain: input.domain,
          description: input.description,
          gitl: input.gitl,
        },
      });
      return {
        success: true,
        project: {
          id: project.id,
          title: project.title,
          domain: project.domain,
          techStack: project.techStack,
          description: project.description,
          gitl: project.gitl,
        },
      };
    }),
});
