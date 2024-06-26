import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SubItem {
  label: string;
  value: string | React.ReactNode;
}

interface HomeCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  value: string | React.ReactNode;
  subItems?: SubItem[];
  className?: string;
  isLoading?: boolean;
  showSubItemSkeletons?: boolean;
}

export function HomeCard({
  href,
  icon: Icon,
  title,
  value,
  subItems,
  className = "",
  isLoading = false,
  showSubItemSkeletons = false,
}: HomeCardProps) {
  const renderSubItems = () => {
    if (isLoading && showSubItemSkeletons) {
      return Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="text-right">
          <Skeleton className="h-4 w-20 mb-1 bg-gray-200" />
          <Skeleton className="h-6 w-24 bg-gray-200" />
        </div>
      ));
    }

    return Array.from({ length: 4 }, (_, index) => {
      const item = subItems?.[3 - index];
      return (
        <div key={index} className="text-right">
          {item && (
            <>
              <p className="text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {item.value}
              </div>
            </>
          )}
        </div>
      );
    });
  };

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
                {isLoading ? (
                  <Skeleton className="h-8 w-32 bg-gray-200" />
                ) : (
                  value
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400">{title}</p>
            </div>
            {(subItems ?? (isLoading && showSubItemSkeletons)) && (
              <div className="grid grid-cols-2 gap-4 justify-items-end">
                {renderSubItems()}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}