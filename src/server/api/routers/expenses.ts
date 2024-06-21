import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const expenseSchema = z.object({
  title: z.string(),
  amount: z.number().positive(),
  date: z.date(),
  category: z.string(),
  description: z.string().optional(),
});

export const expensesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const expenses = await ctx.db.expense.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { date: "desc" },
      });
      return expenses;
    } catch (error) {
      console.error("Error in expenses.getAll:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch expenses",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const expense = await ctx.db.expense.findUnique({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        if (!expense) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Expense not found",
          });
        }
        return expense;
      } catch (error) {
        console.error("Error in expenses.getById:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch expense",
        });
      }
    }),

  create: protectedProcedure
    .input(expenseSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const newExpense = await ctx.db.expense.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });
        return newExpense;
      } catch (error) {
        console.error("Error in expenses.create:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create expense",
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        amount: z.number().positive().optional(),
        date: z.date().optional(),
        category: z.string().optional(),
        description: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...updateData } = input;
        const updatedExpense = await ctx.db.expense.update({
          where: { id, userId: ctx.session.user.id },
          data: updateData,
        });
        return updatedExpense;
      } catch (error) {
        console.error("Error in expenses.update:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update expense",
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.expense.delete({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        return { success: true };
      } catch (error) {
        console.error("Error in expenses.delete:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete expense",
        });
      }
    }),

    getTotalExpenses: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const result = await ctx.db.expense.aggregate({
          where: {
            userId: ctx.session.user.id,
          },
          _sum: {
            amount: true,
          },
        });

        return result._sum.amount || 0;
      } catch (error) {
        console.error("Error in expenses.getTotalExpenses:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to calculate total expenses",
        });
      }
    }),

  getByCategory: protectedProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const expenses = await ctx.db.expense.findMany({
          where: {
            userId: ctx.session.user.id,
            category: input.category,
          },
          orderBy: { date: "desc" },
        });
        return expenses;
      } catch (error) {
        console.error("Error in expenses.getByCategory:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch expenses by category",
        });
      }
    }),

    getTopExpenses: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(4) }))
    .query(async ({ ctx, input }) => {
      try {
        const topExpenses = await ctx.db.expense.findMany({
          where: { userId: ctx.session.user.id },
          orderBy: { amount: "desc" },
          take: input.limit,
          select: {
            id: true,
            title: true,
            amount: true,
            category: true,
          },
        });
        return topExpenses;
      } catch (error) {
        console.error("Error in expenses.getTopExpenses:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch top expenses",
        });
      }
    }),

});
