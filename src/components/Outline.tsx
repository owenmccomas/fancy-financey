import { useSession } from "next-auth/react";
import Nav from "../components/Nav";
import { HomeCard } from "@/components/HomeCard";
import { api } from "@/utils/api";
import {
  Wallet,
  PiggyBank,
  TrendingUp,
  Calendar,
  DollarSign,
  Briefcase,
  InfoIcon,
} from "lucide-react";
import { HoverCard } from "@radix-ui/react-hover-card";
import { HoverCardTrigger } from "./ui/hover-card";
import NetWorthHoverCard from "./NetWorthHoverCard";
import { Skeleton } from "@/components/ui/skeleton";

export function Outline() {
  const sessionData = useSession().data;
  const { data: savingsAmount, isLoading: isSavingsLoading } =
    api.savings.get.useQuery();
  const { data: totalExpenses, isLoading: isExpensesLoading } =
    api.expenses.getTotalExpenses.useQuery();
  const { data: topExpenses, isLoading: isTopExpensesLoading } =
    api.expenses.getTopExpenses.useQuery({ limit: 4 });
  const { data: investmentsAmount, isLoading: isInvestmentsLoading } =
    api.investments.get.useQuery();
  const { data: totalIncome, isLoading: isIncomeLoading } =
    api.income.getTotalIncome.useQuery();
  const { data: topIncomes, isLoading: isTopIncomesLoading } =
    api.income.getTopIncomes.useQuery({ limit: 4 });
  const { data: topAssets, isLoading: isTopAssetsLoading } =
    api.assets.getTopAssets.useQuery({ limit: 4 });
  const { data: totalAssetValue, isLoading: isAssetsLoading } =
    api.assets.getTotalAssetValue.useQuery();
  const { data: totalBills, isLoading: isBillsLoading } =
    api.bills.getTotalBills.useQuery();
  const { data: topBills, isLoading: isTopBillsLoading } =
    api.bills.getTopBills.useQuery({ limit: 4 });
  const { data: totalGoalProgress, isLoading: isGoalsLoading } =
    api.goals.getTotalProgress.useQuery();

  const netWorth =
    (totalIncome ?? 0) -
    (totalExpenses ?? 0) +
    (savingsAmount ?? 0) +
    (totalAssetValue ?? 0) +
    (investmentsAmount ?? 0);

  const formatValue = (value: number | null | undefined) => {
    if (value === undefined || value === null) return "";
    const formattedValue = value.toFixed(2);
    return formattedValue.endsWith(".00")
      ? `$${parseInt(formattedValue)}`
      : `$${formattedValue}`;
  };
  const formatValuePercentage = (value: number | null | undefined) => {
    if (value === undefined || value === null) return "";
    const formattedValue = value.toFixed(2);
    return formattedValue.endsWith(".00")
      ? `${parseInt(formattedValue)}%`
      : `${formattedValue}%`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-100">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[1fr_300px]">
        <main className="mt-0 flex w-full flex-col items-start justify-start gap-8 p-4 md:mt-20 md:p-8 lg:px-16 xl:px-24">
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <p className="text-3xl text-gray-700 dark:text-gray-400">
              Hey, {sessionData?.user?.name?.split(" ")[0]}!
            </p>
            <div className="flex items-center gap-2">
              <div className="text-6xl font-bold text-gray-900 dark:text-gray-50 md:text-8xl">
                {isIncomeLoading ||
                isExpensesLoading ||
                isSavingsLoading ||
                isAssetsLoading ||
                isInvestmentsLoading ? (
                  <Skeleton className="h-20 w-[300px] bg-gray-300" />
                ) : (
                  `$${netWorth.toFixed(2)}`
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-500 dark:text-gray-400">
                Current Net Worth
              </p>
              <HoverCard>
                <HoverCardTrigger>
                  <InfoIcon className="mb-1 h-5 w-5 text-gray-500" />
                </HoverCardTrigger>
                <NetWorthHoverCard />
              </HoverCard>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <HomeCard
              href="/income"
              icon={DollarSign}
              title="Income"
              value={formatValue(totalIncome)}
              isLoading={isIncomeLoading || isTopIncomesLoading}
              showSubItemSkeletons={true}
              className="sm:col-span-2"
              subItems={topIncomes?.map((income) => ({
                label: income.source,
                value: formatValue(income.amount),
              }))}
            />
            <HomeCard
              href="/savings"
              icon={PiggyBank}
              title="Savings"
              value={formatValue(savingsAmount)}
              isLoading={isSavingsLoading}
            />
            <HomeCard
              href="/expenses"
              icon={Wallet}
              title="Expenses"
              value={formatValue(totalExpenses)}
              isLoading={isExpensesLoading || isTopExpensesLoading}
              showSubItemSkeletons={true}
              className="sm:col-span-2 lg:col-span-3"
              subItems={topExpenses?.map((expense) => ({
                label: expense.title,
                value: formatValue(expense.amount),
              }))}
            />
            <HomeCard
              href="/investments"
              icon={TrendingUp}
              title="Investments"
              value={formatValue(investmentsAmount)}
              isLoading={isInvestmentsLoading}
            />
            <HomeCard
              href="/assets"
              icon={Briefcase}
              title="Assets"
              className="sm:col-span-2"
              value={formatValue(totalAssetValue)}
              isLoading={isAssetsLoading || isTopAssetsLoading}
              showSubItemSkeletons={true}
              subItems={topAssets?.map((asset) => ({
                label: asset.name,
                value: formatValue(asset.value),
              }))}
            />
            <div className="col-span-1 my-2 h-px border-r bg-gray-300 sm:col-span-3"></div>
            <p className="col-span-1 text-gray-500 dark:text-gray-400 sm:col-span-3">
              Trackers for your Bills and your Goals (Doesn&apos;t Affect Net
              Worth)
            </p>
            <HomeCard
              href="/bills"
              icon={Calendar}
              title="Bills"
              value={formatValue(totalBills)}
              isLoading={isBillsLoading || isTopBillsLoading}
              showSubItemSkeletons={true}
              className="sm:col-span-2"
              subItems={topBills?.map((bill) => ({
                label: bill.title,
                value: formatValue(bill.amount),
              }))}
            />
            <HomeCard
              href="/goals"
              icon={Briefcase}
              title="Goals"
              value={formatValuePercentage(totalGoalProgress)}
              isLoading={isGoalsLoading}
            />
          </div>
        </main>
        <Nav />
      </div>
    </div>
  );
}
