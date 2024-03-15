import { userRouter } from "~/server/api/routers/user";
// import {projectRouter } from "~/server/api/routers/project";
import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "./routers/project";
import { techStackRouter } from "./routers/techStack";
import { requesttRouter } from "./routers/request";

export const appRouter = createTRPCRouter({
  user: userRouter,
  project: projectRouter,
  techstack: techStackRouter,
  request: requesttRouter
});

export type AppRouter = typeof appRouter;
