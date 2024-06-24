import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const billSchema = z.object({
  title: z.string(),
  amount: z.number().positive(),
  dueDate: z.date(),
  category: z.string(),
  description: z.string().optional(),
});

export const billsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const bills = await ctx.db.bill.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { dueDate: "asc" },
      });
      return bills;
    } catch (error) {
      console.error("Error in bills.getAll:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch bills",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const bill = await ctx.db.bill.findUnique({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        if (!bill) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Bill not found",
          });
        }
        return bill;
      } catch (error) {
        console.error("Error in bills.getById:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch bill",
        });
      }
    }),

  create: protectedProcedure
    .input(billSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const newBill = await ctx.db.bill.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });
        return newBill;
      } catch (error) {
        console.error("Error in bills.create:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create bill",
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        amount: z.number().positive().optional(),
        dueDate: z.date().optional(),
        category: z.string().optional(),
        description: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...updateData } = input;
        const updatedBill = await ctx.db.bill.update({
          where: { id, userId: ctx.session.user.id },
          data: updateData,
        });
        return updatedBill;
      } catch (error) {
        console.error("Error in bills.update:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update bill",
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.bill.delete({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        return { success: true };
      } catch (error) {
        console.error("Error in bills.delete:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete bill",
        });
      }
    }),

  getTotalBills: protectedProcedure.query(async ({ ctx }) => {
    try {
      const result = await ctx.db.bill.aggregate({
        where: {
          userId: ctx.session.user.id,
        },
        _sum: {
          amount: true,
        },
      });

      return result._sum.amount ?? 0;
    } catch (error) {
      console.error("Error in bills.getTotalBills:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to calculate total bills",
      });
    }
  }),

  getByCategory: protectedProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const bills = await ctx.db.bill.findMany({
          where: {
            userId: ctx.session.user.id,
            category: input.category,
          },
          orderBy: { dueDate: "asc" },
        });
        return bills;
      } catch (error) {
        console.error("Error in bills.getByCategory:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch bills by category",
        });
      }
    }),

  getTopBills: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(4) }))
    .query(async ({ ctx, input }) => {
      try {
        const topBills = await ctx.db.bill.findMany({
          where: { userId: ctx.session.user.id },
          orderBy: { amount: "desc" },
          take: input.limit,
          select: {
            id: true,
            title: true,
            amount: true,
            category: true,
            dueDate: true,
          },
        });
        return topBills;
      } catch (error) {
        console.error("Error in bills.getTopBills:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch top bills",
        });
      }
    }),
});