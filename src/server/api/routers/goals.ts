import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { GoalStatus } from "@/types";

export const goalsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.goal.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  getTotalProgress: protectedProcedure.query(async ({ ctx }) => {
    const goals = await ctx.db.goal.findMany({
      where: { userId: ctx.session.user.id },
    });

    if (goals.length === 0) return 0;

    const totalProgress = goals.reduce((acc, goal) => {
      const progress = (goal.currentAmount / goal.targetAmount) * 100;
      return acc + progress;
    }, 0);

    return totalProgress / goals.length;
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        targetAmount: z.number().positive(),
        currentAmount: z.number().min(0),
        targetDate: z.date(),
        category: z.string(),
        priority: z.number().int().min(1).max(5).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.goal.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
          status: "In Progress" as GoalStatus,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        targetAmount: z.number().positive().optional(),
        currentAmount: z.number().min(0).optional(),
        targetDate: z.date().optional(),
        category: z.string().optional(),
        priority: z.number().int().min(1).max(5).optional(),
        status: z.enum(["In Progress", "Completed", "Cancelled"] as const).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.goal.update({
        where: { id, userId: ctx.session.user.id },
        data,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.goal.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),
});