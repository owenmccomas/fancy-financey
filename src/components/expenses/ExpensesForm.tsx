import { useState } from "react";
import { useForm } from "react-hook-form";
import { Expense } from "./expensesData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from 'react';
import * as LucideIcons from 'lucide-react';

const iconOptions = [
  { value: 'Home', label: 'Housing' },
  { value: 'Car', label: 'Auto' },
  { value: 'ShoppingCart', label: 'Shopping Cart' },
  { value: 'Zap', label: 'Electricity' },
  { value: 'Plus', label: 'Plus' },
  { value: 'Wallet', label: 'Wallet' },
  { value: 'CreditCard', label: 'Credit Card' },
  { value: 'Dog', label: 'Pet' },
  { value: 'BarChart', label: 'Analytics' },
  { value: 'DollarSign', label: 'Expenses' },
  { value: 'Receipt', label: 'Bills' },
  { value: 'CalendarDays', label: 'Planning' },
  { value: 'Briefcase', label: 'Materials' },
  { value: 'Building', label: 'Real Estate' },
  { value: 'Plane', label: 'Travel' }
];

interface ExpensesFormProps {
  onAddExpense: (newExpense: Expense) => void;
}

export default function ExpensesForm({ onAddExpense }: ExpensesFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Expense, "id" | "icon">>();
  const [selectedIcon, setSelectedIcon] = useState<string>("Home");

  const onSubmit = (data: Omit<Expense, "id" | "icon">) => {
    const newExpense: Expense = {
      ...data,
      id: Date.now().toString(),
      icon: selectedIcon,
    };
    onAddExpense(newExpense);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-w-[600px] max-w-[800px] space-y-4 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div>
        <p className="mb-1 text-sm text-gray-900">Expense Title</p>
        <Input
          {...register("title", { required: "Title is required" })}
          placeholder={`"Auto", "Rent", "Groceries", etc.`}
        />
        {errors.title && (
          <p className="mt-1 text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div>
        <p className="mb-1 text-sm text-gray-900">Amount</p>
        <Input
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0, message: "Amount must be a positive number" },
            valueAsNumber: true,
          })}
          type="number"
          placeholder="i.e. 600"
        />
        {errors.amount && (
          <p className="mt-1 text-red-500">{errors.amount.message}</p>
        )}
      </div>
      <div>
        <p className="mb-1 text-sm text-gray-900">Icon</p>
        <Select onValueChange={setSelectedIcon} defaultValue={selectedIcon}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an icon" />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((option) => {
              const IconComponent = LucideIcons[option.value as keyof typeof LucideIcons] as React.ElementType;
              return (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Add Expense
      </Button>
    </form>
  );
}