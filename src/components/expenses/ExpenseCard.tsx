import { useState } from "react";
import type { Expense } from "./expensesData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as LucideIcons from "lucide-react";

interface ExpenseCardProps {
  expense: Expense;
  onUpdate: (updatedExpense: Expense) => void;
}

export default function ExpenseCard({ expense, onUpdate }: ExpenseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<{ amount: number }>();

  const onSubmit = (values: { amount: number }) => {
    onUpdate({ ...expense, amount: values.amount });
    setIsOpen(false);
  };

  const IconComponent = LucideIcons[expense.icon as keyof typeof LucideIcons] as React.ElementType;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="bg-gradient-to-br from-white to-slate-50 pt-4 transition hover:scale-105 hover:shadow-md cursor-pointer w-64">
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center w-full">
              {IconComponent && (
                <div className="mb-4 p-3 bg-indigo-100 rounded-full">
                  <IconComponent size={32} className="text-indigo-600" />
                </div>
              )}
              <p className="text-xl font-semibold text-gray-700 mb-2">
                {expense.title}
              </p>
              <div className="text-3xl font-bold text-gray-900">
                ${expense.amount.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter or Edit Monthly {expense.title} Expenses</DialogTitle>
          <DialogDescription>
            Update your monthly {expense.title.toLowerCase()} expenses here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("amount", {
              required: "Amount is required",
              min: { value: 0, message: "Amount must be a positive number" },
            })}
            type="number"
            placeholder={`Current: $${expense.amount}`}
          />
          {errors.amount && <p className="text-red-500 mt-2">{errors.amount.message}</p>}
          <Button className="mt-4 w-full" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}