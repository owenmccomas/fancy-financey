import React from 'react';
import { HoverCardContent } from '@/components/ui/hover-card';

const NetWorthHoverCard = () => {
  return (
    <HoverCardContent className="w-80 p-4">
      <h3 className="mb-2 text-lg font-semibold">Understanding Net Worth</h3>
      <p className="mb-2 text-sm text-gray-600">
        Your net worth is a snapshot of your financial health, calculated as:
      </p>
      <ul className="mb-2 list-inside list-disc text-sm text-gray-600">
        <li>Total Income</li>
        <li>+ Savings</li>
        <li>+ Total Asset Value</li>
        <li>+ Investments</li>
        <li>- Total Expenses</li>
      </ul>
      <p className="text-sm text-gray-600">
        This figure represents the sum of all your assets minus your liabilities, giving you a clear picture of your overall financial position.
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Note: Net worth can fluctuate based on market conditions and your financial activities.
      </p>
    </HoverCardContent>
  );
};

export default NetWorthHoverCard;