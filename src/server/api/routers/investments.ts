import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const investmentsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      console.log("Fetching investments for user:", ctx.session.user.id);
      const investments = await ctx.db.investment.findMany({
        where: { userId: ctx.session.user.id },
      });
      console.log("Fetched investments:", investments);
      const totalInvested = investments.reduce(
        (sum, inv) => sum + inv.amountInvested,
        0,
      );
      return totalInvested;
    } catch (error) {
      console.error("Detailed error in investments.get:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.string(),
        amountInvested: z.number(),
        currentValue: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(
          "Adding/Updating investment for user:",
          ctx.session.user.id,
        );
        console.log("Investment details:", input);

        const newInvestment = await ctx.db.investment.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });

        console.log("Investment added successfully:", newInvestment);

        return newInvestment;
      } catch (error) {
        console.error("Detailed error in investments.update:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `An unexpected error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),
});
