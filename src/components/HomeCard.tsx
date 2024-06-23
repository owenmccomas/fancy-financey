import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface SubItem {
  label: string;
  value: string;
}

interface HomeCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  value: string;
  subItems?: SubItem[];
  className?: string;
}

export function HomeCard({
  href,
  icon: Icon,
  title,
  value,
  subItems,
  className = "",
}: HomeCardProps) {
  return (
    <Card
      className={`bg-gradient-to-br from-white to-indigo-50 pt-4 transition hover:scale-105 hover:shadow-md ${className}`}
    >
      <Link href={href}>
        <CardContent className="flex flex-col items-start justify-center gap-4">
          <div className="flex w-full items-center justify-between">
            <div>
              <Icon className="m-1 h-8 w-8 text-primary" />
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {value}
              </div>
              <p className="text-gray-500 dark:text-gray-400">{title}</p>
            </div>
            {subItems && (
              <div className="grid grid-cols-2 gap-4 justify-items-end">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="text-right">
                    {subItems[3 - index] && (
                      <>
                        <p className="text-gray-500 dark:text-gray-400">
                          {subItems[3 - index]?.label}
                        </p>
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                          {subItems[3 - index]?.value}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}