import { savingsRouter } from "./routers/savings";
import { expensesRouter } from "./routers/expenses";
import { investmentsRouter } from "./routers/investments";
import { incomeRouter } from "./routers/income";
import { assetsRouter } from "./routers/assets";
import { billsRouter } from "./routers/bills";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  savings: savingsRouter,
  expenses: expensesRouter,
  investments: investmentsRouter,
  income: incomeRouter,
  assets: assetsRouter,
  bills: billsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
