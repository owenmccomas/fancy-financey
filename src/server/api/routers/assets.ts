import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const assetSchema = z.object({
  name: z.string(),
  value: z.number().positive(),
  date: z.date(),
  category: z.string(),
  description: z.string().optional(),
});

export const assetsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const assets = await ctx.db.asset.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { date: "desc" },
      });
      return assets;
    } catch (error) {
      console.error("Error in assets.getAll:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch assets",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const asset = await ctx.db.asset.findUnique({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        if (!asset) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Asset not found",
          });
        }
        return asset;
      } catch (error) {
        console.error("Error in assets.getById:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch asset",
        });
      }
    }),

  create: protectedProcedure
    .input(assetSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const newAsset = await ctx.db.asset.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });
        return newAsset;
      } catch (error) {
        console.error("Detailed error in assets.create:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create asset",
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        value: z.number().positive().optional(),
        date: z.date().optional(),
        category: z.string().optional(),
        description: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...updateData } = input;
        const updatedAsset = await ctx.db.asset.update({
          where: { id, userId: ctx.session.user.id },
          data: updateData,
        });
        return updatedAsset;
      } catch (error) {
        console.error("Error in assets.update:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update asset",
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.asset.delete({
          where: { id: input.id, userId: ctx.session.user.id },
        });
        return { success: true };
      } catch (error) {
        console.error("Error in assets.delete:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete asset",
        });
      }
    }),

  getTotalAssetValue: protectedProcedure.query(async ({ ctx }) => {
    try {
      const result = await ctx.db.asset.aggregate({
        where: {
          userId: ctx.session.user.id,
        },
        _sum: {
          value: true,
        },
      });

      return result._sum.value ?? 0;
    } catch (error) {
      console.error("Error in assets.getTotalAssetValue:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to calculate total asset value",
      });
    }
  }),

  getByCategory: protectedProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const assets = await ctx.db.asset.findMany({
          where: {
            userId: ctx.session.user.id,
            category: input.category,
          },
          orderBy: { date: "desc" },
        });
        return assets;
      } catch (error) {
        console.error("Error in assets.getByCategory:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch assets by category",
        });
      }
    }),

  getTopAssets: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(10).default(4) }))
    .query(async ({ ctx, input }) => {
      try {
        const topAssets = await ctx.db.asset.findMany({
          where: { userId: ctx.session.user.id },
          orderBy: { value: "desc" },
          take: input.limit,
          select: {
            id: true,
            name: true,
            value: true,
            category: true,
          },
        });
        return topAssets;
      } catch (error) {
        console.error("Error in assets.getTopAssets:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch top assets",
        });
      }
    }),
});