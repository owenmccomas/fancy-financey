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

export function Outline() {
  const sessionData = useSession().data;
  const { data: savingsAmount } = api.savings.get.useQuery();
  const { data: totalExpenses } = api.expenses.getTotalExpenses.useQuery();
  const { data: topExpenses } = api.expenses.getTopExpenses.useQuery({
    limit: 4,
  });
  const { data: investmentsAmount } = api.investments.get.useQuery();
  const { data: totalIncome } = api.income.getTotalIncome.useQuery();
  const { data: topIncomes } = api.income.getTopIncomes.useQuery({ limit: 4 });
  const { data: topAssets } = api.assets.getTopAssets.useQuery({ limit: 4 });
  const { data: totalAssetValue } = api.assets.getTotalAssetValue.useQuery();

  const netWorth =
    (totalIncome ?? 0) -
    (totalExpenses ?? 0) +
    (savingsAmount ?? 0) +
    (totalAssetValue ?? 0) +
    (investmentsAmount ?? 0);

  const formatValue = (value: number | null | undefined) => {
    if (value === undefined || value === null) return "---.--";
    const formattedValue = value.toFixed(2);
    return formattedValue.endsWith(".00")
      ? `$${parseInt(formattedValue)}`
      : `$${formattedValue}`;
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
                {netWorth !== undefined && netWorth !== null
                  ? `$${netWorth.toFixed(2)}`
                  : "---.--"}
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
              className="sm:col-span-2"
              subItems={
                topIncomes?.map((income) => ({
                  label: income.source,
                  value: formatValue(income.amount),
                })) ?? []
              }
            />
            <HomeCard
              href="/savings"
              icon={PiggyBank}
              title="Savings"
              value={formatValue(savingsAmount)}
            />
            <HomeCard
              href="/expenses"
              icon={Wallet}
              title="Expenses"
              value={formatValue(totalExpenses)}
              className="sm:col-span-2 lg:col-span-3"
              subItems={
                topExpenses?.map((expense) => ({
                  label: expense.title,
                  value: formatValue(expense.amount),
                })) ?? []
              }
            />
            <HomeCard
              href="/investments"
              icon={TrendingUp}
              title="Investments"
              value={formatValue(investmentsAmount)}
            />
            <HomeCard
              href="/assets"
              icon={Briefcase}
              title="Assets"
              className="sm:col-span-2"
              value={formatValue(totalAssetValue)}
              subItems={
                topAssets?.map((asset) => ({
                  label: asset.name,
                  value: formatValue(asset.value),
                })) ?? []
              }
            />
            <div className="col-span-1 my-2 h-px border-r bg-gray-300 sm:col-span-3"></div>
            <p className="col-span-1 text-gray-500 dark:text-gray-400 sm:col-span-3">
              Bills Tracker and Goals (Doesn&apos;t Effect Net Worth)
            </p>
            <HomeCard
              href="#"
              icon={Calendar}
              title="Bills"
              value="$2,345"
              className="sm:col-span-2"
              subItems={[
                { label: "Electricity", value: "$150" },
                { label: "Water", value: "$75" },
                { label: "Internet", value: "$100" },
                { label: "Phone", value: "$75" },
              ]}
            />
            <HomeCard href="#" icon={Briefcase} title="Goals" value="$10,000" />
          </div>
        </main>
        <Nav />
      </div>
    </div>
  );
}
