import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const savingsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      console.log("Fetching savings for user:", ctx.session.user.id);
      const savings = await ctx.db.savings.findUnique({
        where: { userId: ctx.session.user.id },
      });
      console.log("Fetched savings:", savings);
      return savings?.amount ?? 0;
    } catch (error) {
      console.error("Detailed error in savings.get:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }),

  update: protectedProcedure
    .input(z.object({ amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        console.log("Updating savings for user:", ctx.session.user.id);
        console.log("New savings amount:", input.amount);

        const updatedSavings = await ctx.db.savings.upsert({
          where: { userId: ctx.session.user.id },
          update: { amount: input.amount },
          create: {
            amount: input.amount,
            userId: ctx.session.user.id,
          },
        });

        console.log("Savings updated successfully:", updatedSavings);

        return updatedSavings;
      } catch (error) {
        console.error("Detailed error in savings.update:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  testConnection: protectedProcedure.query(async ({ ctx }) => {
    try {
      await ctx.db.$queryRaw`SELECT 1`;
      return "Database connection successful";
    } catch (error) {
      console.error("Database connection error:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to connect to the database",
      });
    }
  }),
});
