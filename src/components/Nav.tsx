import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  BarChartIcon,
  CalendarIcon,
  DollarSignIcon,
  HomeIcon,
  PiggyBankIcon,
  SettingsIcon,
  TrendingUpIcon,
  UserIcon,
  WalletIcon,
  BriefcaseIcon,
} from "../lib/svgs";

const navItems = [
  [
    {
      href: "/",
      icon: <HomeIcon className="h-7 w-7" />,
      label: "Dashboard",
    },
    {
      href: "/income",
      icon: <DollarSignIcon className="h-7 w-7" />,
      label: "Income",
    },
    {
      href: "/savings",
      icon: <PiggyBankIcon className="h-7 w-7" />,
      label: "Savings",
    },
    {
      href: "/expenses",
      icon: <WalletIcon className="h-7 w-7" />,
      label: "Expenses",
    },
    {
      href: "/investments",
      icon: <TrendingUpIcon className="h-7 w-7" />,
      label: "Investments",
    },
    {
      href: "/assets",
      icon: <BriefcaseIcon className="h-7 w-7" />,
      label: "Assets",
    },
    {
      href: "/bills",
      icon: <CalendarIcon className="h-7 w-7" />,
      label: "Bills",
    },
    {
      href: "/goals",
      icon: <BarChartIcon className="h-7 w-7" />,
      label: "Goals",
    },
    {
      href: "/account",
      icon: <UserIcon className="h-7 w-7" />,
      label: "Account",
      onClick: () => signOut(),
    },
    {
      href: "/settings",
      icon: <SettingsIcon className="h-7 w-7" />,
      label: "Settings",
    },
  ],
].flat();

export default function Nav() {
  return (
    <aside className="group fixed right-0 top-1/2 hidden w-20 -translate-y-1/2 transition-all duration-500 ease-in-out hover:w-64 md:flex">
      <div className="flex-1 overflow-auto py-2">
        <div className="h-full overflow-hidden">
          <nav className="flex h-full flex-col items-start px-2 text-base font-medium">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-gray-700 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
                onClick={item.onClick}
              >
                <div className="mr-2 flex-shrink-0">{item.icon}</div>
                <span className="duration-250 translate-x-full transform transition-transform ease-in-out group-hover:translate-x-0">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
