import { useSession } from "next-auth/react";
import Nav from "../components/Nav";
import { HomeCard } from "@/components/HomeCard";
import { api } from "@/utils/api";
import {
  Wallet,
  PiggyBank,
  TrendingUp,
  Calendar,
  BarChart,
  DollarSign,
  Briefcase,
} from "lucide-react";


export function Outline() {
  const sessionData = useSession().data;
  const { data: savingsAmount } =
  api.savings.get.useQuery();


  return (
    <div className="grid min-h-screen w-screen grid-cols-1 bg-gradient-to-br from-slate-50 to-indigo-50 md:grid-cols-[1fr_300px]">
      <main className="ml-80 flex w-full flex-col items-start justify-center gap-8 pr-80">
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <p className="text-3xl text-gray-700 dark:text-gray-400">
            Hey, {sessionData?.user?.name?.split(" ")[0]}!
          </p>
          <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
            $89,432
          </div>
          <p className="text-gray-500 dark:text-gray-400">Current Net Worth</p>
        </div>
        <div className="grid w-full grid-cols-3 gap-4">
          <HomeCard
            href="/expenses"
            icon={Wallet}
            title="Expenses"
            value="$12,345"
            className="col-span-2"
            subItems={[
              { label: "Rent", value: "$1,500" },
              { label: "Auto", value: "$350" },
              { label: "Utilities", value: "$200" },
              { label: "Groceries", value: "$500" },
            ]}
          />
          <HomeCard
            href="/savings"
            icon={PiggyBank}
            title="Savings"
            value={savingsAmount?.toFixed(2) ?? "0.00"}
          />
          <HomeCard
            href="#"
            icon={TrendingUp}
            title="Investments"
            value="$45,678"
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
            href="#"
            icon={BarChart}
            title="Budgeting"
            value="$3,456"
            className="col-span-3"
            subItems={[
              { label: "Food", value: "$1,000" },
              { label: "Entertainment", value: "$500" },
              { label: "Misc", value: "$500" },
              { label: "Savings", value: "$1,456" },
            ]}
          />
          <HomeCard
            href="#"
            icon={DollarSign}
            title="Income"
            value="$7,890"
            className="col-span-2"
            subItems={[{ label: "Monthly", value: "$6,000" }]}
          />
          <HomeCard href="#" icon={Briefcase} title="Assets" value="$23,456" />
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
