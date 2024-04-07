import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    let projects = await ctx.db.project.findMany({
      where: {
        userId: Number(ctx.session?.user.id),
      },
      include: {
        TechStacks: true,
      },
    });
    return {
      success: true,
      projects,
    };
  }),

  Alist: publicProcedure.query(async ({ ctx }) => {
    let projects = await ctx.db.project.findMany({
      include: {
        TechStacks: true,
      },
    });
    return {
      success: true,
      projects,
    };
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        domain: z.string().min(1),
        techStacks: z.array(z.number()),
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
          User: {
            connect: {
              id: Number(ctx.session.user.id),
            },
          },
          TechStacks: {
            connect: input.techStacks.map((id) => ({ id })),
          },
        },
      });
      return {
        success: true,
        message: "Project created successfully",
      };
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        domain: z.string().min(1),
        techStacks: z.array(z.number()),
        description: z.string().min(1),
        gitl: z.string().min(1).url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let project = await ctx.db.project.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!project) {
        return {
          success: false,
          message: "Project not found",
        };
      }
      project = await ctx.db.project.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          domain: input.domain,
          description: input.description,
          gitl: input.gitl,
          User: {
            connect: {
              id: Number(ctx.session.user.id),
            },
          },
          TechStacks: {
            set: input.techStacks.map((id) => ({ id })),
          },
        },
      });
      return {
        success: true,
        message: "Project updated successfully",
      };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      let project = await ctx.db.project.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!project) {
        return {
          success: false,
          message: "Project not found",
        };
      }
      await ctx.db.project.delete({
        where: {
          id: input.id,
        },
      });
      return {
        success: true,
        message: "Project deleted successfully",
      };
    }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      let project = await ctx.db.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          TechStacks: true,
          User: true,
        },
      });
      if (!project) {
        return {
          success: false,
          message: "Project not found",
        };
      }
      return {
        success: true,
        project,
      };
    }),
});
