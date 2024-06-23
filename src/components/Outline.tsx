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
} from "lucide-react";

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
      return formattedValue.endsWith('.00') 
        ? `$${parseInt(formattedValue)}` 
        : `$${formattedValue}`;
    };

  return (
    <div className="grid min-h-screen w-screen grid-cols-1 bg-gradient-to-br from-slate-50 to-indigo-100 md:grid-cols-[1fr_300px]">
      <main className="ml-80 flex w-full flex-col items-start justify-center gap-8 pr-80">
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <p className="text-3xl text-gray-700 dark:text-gray-400">
            Hey, {sessionData?.user?.name?.split(" ")[0]}!
          </p>
          <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
            {netWorth !== undefined && netWorth !== null
              ? `$${netWorth.toFixed(2)}`
              : "---.--"}
          </div>
          <p className="text-gray-500 dark:text-gray-400">Current Net Worth</p>
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          <HomeCard
            href="/expenses"
            icon={Wallet}
            title="Expenses"
            value={formatValue(totalExpenses)}
            className="col-span-2"
            subItems={
              topExpenses?.map((expense) => ({
                label: expense.title,
                value: formatValue(expense.amount),
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
            href="/investments"
            icon={TrendingUp}
            title="Investments"
            value={formatValue(investmentsAmount)}
          />
          <HomeCard
            href="#"
            icon={Calendar}
            title="Bills"
            value="$2,345"
            className="col-span-2"
            subItems={[
              { label: "Electricity", value: "$150" },
              { label: "Water", value: "$75" },
              { label: "Internet", value: "$100" },
              { label: "Phone", value: "$75" },
            ]}
          />
          <HomeCard
            href="/income"
            icon={DollarSign}
            title="Income"
            value={formatValue(totalIncome)}
            className="col-span-2"
            subItems={
              topIncomes?.map((income) => ({
                label: income.source,
                value: formatValue(income.amount),
              })) ?? []
            }
          />
          <HomeCard
            href="/assets"
            icon={Briefcase}
            title="Assets"
            value={formatValue(totalAssetValue)}
          />
          <HomeCard
            href="#"
            icon={Briefcase}
            title="Goals"
            value="$10,000"
            className="col-span-3"
          />
        </div>
      </main>
      <Nav />
    </div>
  );
}
