import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

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
  colSpan?: number;
}

export function HomeCard({ href, icon: Icon, title, value, subItems, colSpan = 1 }: HomeCardProps) {
  return (
    <Card className={`bg-gradient-to-br from-white to-slate-50 pt-4 transition hover:scale-105 hover:shadow-md col-span-${colSpan}`}>
      <Link href={href}>
        <CardContent className="flex flex-col items-start justify-center gap-4">
          <div className="flex w-full items-center justify-between">
            <div>
              <Icon className="h-8 w-8 m-1 text-primary" />
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {value}
              </div>
              <p className="text-gray-500 dark:text-gray-400">{title}</p>
            </div>
            {subItems && (
              <div className="grid grid-cols-2 gap-4">
                {subItems.map((item, index) => (
                  <div key={index}>
                    <p className="text-gray-500 dark:text-gray-400">{item.label}</p>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                      {item.value}
                    </div>
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