import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const incomeSchema = z.object({
  amount: z.number().positive(),
  date: z.date(),
  source: z.string(),
  description: z.string().optional(),
});

export const incomeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const incomes = await ctx.db.income.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { date: "desc" },
      });
      return incomes;
    } catch (error) {
      console.error("Error in income.getAll:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch incomes",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const income = await ctx.db.income.findUnique({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        if (!income) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Income not found",
          });
        }
        return income;
      } catch (error) {
        console.error("Error in income.getById:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch income",
        });
      }
    }),

  create: protectedProcedure
    .input(incomeSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const newIncome = await ctx.db.income.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });
        return newIncome;
      } catch (error) {
        console.error("Error in income.create:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create income",
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        amount: z.number().positive().optional(),
        date: z.date().optional(),
        source: z.string().optional(),
        description: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...updateData } = input;
        const updatedIncome = await ctx.db.income.update({
          where: { id, userId: ctx.session.user.id },
          data: updateData,
        });
        return updatedIncome;
      } catch (error) {
        console.error("Error in income.update:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update income",
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.income.delete({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        return { success: true };
      } catch (error) {
        console.error("Error in income.delete:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete income",
        });
      }
    }),

  getTotalIncome: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const result = await ctx.db.income.aggregate({
          where: {
            userId: ctx.session.user.id,
          },
          _sum: {
            amount: true,
          },
        });

        return result._sum.amount ?? 0;
      } catch (error) {
        console.error("Error in income.getTotalIncome:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to calculate total income",
        });
      }
    }),

  getBySource: protectedProcedure
    .input(z.object({ source: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const incomes = await ctx.db.income.findMany({
          where: {
            userId: ctx.session.user.id,
            source: input.source,
          },
          orderBy: { date: "desc" },
        });
        return incomes;
      } catch (error) {
        console.error("Error in income.getBySource:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch incomes by source",
        });
      }
    }),

  getTopIncomes: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(4) }))
    .query(async ({ ctx, input }) => {
      try {
        const topIncomes = await ctx.db.income.findMany({
          where: { userId: ctx.session.user.id },
          orderBy: { amount: "desc" },
          take: input.limit,
          select: {
            id: true,
            amount: true,
            source: true,
            date: true,
          },
        });
        return topIncomes;
      } catch (error) {
        console.error("Error in income.getTopIncomes:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch top incomes",
        });
      }
    }),
});