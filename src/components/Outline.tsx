/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/PKSccpzW8fB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card, CardContent } from "@/components/ui/card";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import { ResponsiveLine } from "@nivo/line"
import { JSX, SVGProps } from "react";

export function Outline() {
  const sessionData = useSession().data;

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
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="col-span-2 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-2 bg-gradient-to-br from-white to-slate-50">
            <Link href="#">
              <CardContent className="flex flex-col items-start justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <WalletIcon className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      $12,345
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Expenses</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Rent</p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $1,500
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Auto</p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $350
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Utilities
                      </p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $200
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Groceries
                      </p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $500
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="col-span-1 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-1 bg-gradient-to-br from-white to-slate-50">
            <Link href="#">
              <CardContent className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <PiggyBankIcon className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      $8,901
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Savings</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="col-span-1 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-1 bg-gradient-to-br from-white to-slate-50">
            <Link href="#">
              <CardContent className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <TrendingUpIcon className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      $45,678
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Investments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="col-span-2 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-2 bg-gradient-to-br from-white to-slate-50">
            <Link href="#">
              <CardContent className="flex flex-col items-start justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <CalendarIcon className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      $2,345
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Bills</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Electricity
                      </p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $150
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Water</p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $75
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Internet
                      </p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $100
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Phone</p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $75
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="col-span-3 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-3 bg-gradient-to-br from-white to-slate-50">
            <Link href="#">
              <CardContent className="flex flex-col items-start justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <BarChartIcon className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      $3,456
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Budgeting
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Food</p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $1,000
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Entertainment
                      </p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $500
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Misc</p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $500
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Savings
                      </p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $1,456
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="col-span-2 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-2 bg-gradient-to-br from-white to-slate-50">
            <Link href="#">
              <CardContent className="flex flex-col items-start justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <DollarSignIcon className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      $7,890
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Income</p>
                  </div>
                  <div className="gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Monthly
                      </p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        $6,000
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="col-span-1 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-1 bg-gradient-to-br from-white to-slate-50">
            <Link href="#">
              <CardContent className="flex flex-col items-start justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <BriefcaseIcon className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      $23,456
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Assets</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
          <Card className="col-span-3 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-3 bg-gradient-to-br from-white to-slate-50">
            <Link href="#">
              <CardContent className="flex flex-col items-start justify-center gap-4">
                <div className="flex w-full items-center justify-between">
                  <div>
                    <BriefcaseIcon className="h-8 w-8 text-primary" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      $10,000
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">Goals</p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </main>
      <aside className="group fixed right-0 top-1/2 hidden w-20 -translate-y-1/2 transition-all duration-500 ease-in-out hover:w-64 md:flex">
        <div className="flex-1 overflow-auto py-2">
          <div className="h-full overflow-hidden">
            <nav className="flex h-full flex-col items-start px-2 text-base font-medium">
              {[
                {
                  href: "#",
                  icon: <HomeIcon className="h-7 w-7" />,
                  label: "Dashboard",
                },
                {
                  href: "#",
                  icon: <WalletIcon className="h-7 w-7" />,
                  label: "Expenses",
                },
                {
                  href: "#",
                  icon: <TrendingUpIcon className="h-7 w-7" />,
                  label: "Investments",
                },
                {
                  href: "#",
                  icon: <CalendarIcon className="h-7 w-7" />,
                  label: "Bills",
                },
                {
                  href: "#",
                  icon: <PiggyBankIcon className="h-7 w-7" />,
                  label: "Savings",
                },
                {
                  href: "#",
                  icon: <BarChartIcon className="h-7 w-7" />,
                  label: "Budgeting",
                },
                {
                  href: "#",
                  icon: <DollarSignIcon className="h-7 w-7" />,
                  label: "Income",
                },
                {
                  href: "#",
                  icon: <UserIcon className="h-7 w-7" />,
                  label: "Account",
                  onClick: () => signOut(),
                },
                {
                  href: "#",
                  icon: <SettingsIcon className="h-7 w-7" />,
                  label: "Settings",
                },
              ].map((item, index) => (
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
    </div>
  );
}

function BarChartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function BriefcaseIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CalendarIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function DollarSignIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function Package2Icon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PiggyBankIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z" />
      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
      <path d="M16 11h0" />
    </svg>
  );
}

function SettingsIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrendingUpIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function WalletIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
