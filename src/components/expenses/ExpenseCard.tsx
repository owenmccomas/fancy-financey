import { useState } from "react";
import { Expense } from "@prisma/client";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ExpenseCardProps {
  expense: Expense;
  onUpdate: (updatedExpense: Partial<Expense> & { id: number }) => void;
  onDelete: (id: number) => void;
}

export default function ExpenseCard({
  expense,
  onUpdate,
  onDelete,
}: ExpenseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Expense>>();

  const onSubmit = (values: Partial<Expense>) => {
    const updatedValues = {
      ...values,
      date: values.date ? new Date(values.date) : undefined,
    };
    onUpdate({ id: expense.id, ...updatedValues });
    setIsOpen(false);
  };

  const IconComponent =
    (LucideIcons[
      expense.category as keyof typeof LucideIcons
    ] as React.ElementType) || LucideIcons.CreditCard;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card className="w-64 cursor-pointer bg-gradient-to-br from-white to-slate-50 pt-4 transition hover:scale-105 hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="mr-4 rounded-full bg-indigo-50 p-3">
                  <IconComponent size={32} className="text-indigo-600" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="mb-2 text-xl font-semibold text-gray-700">
                    {expense.title}
                  </p>
                  <div className="text-3xl font-bold text-gray-900">
                    ${expense.amount.toLocaleString()}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {expense.title} Expense</DialogTitle>
            <DialogDescription>
              Update your {expense.category.toLowerCase()} expense here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("amount", {
                valueAsNumber: true,
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
                max: {
                  value: 999999,
                  message:
                    "Amount must be less than 6 figures, if you need more than that, you are proably using the wrong app my friend",
                },
              })}
              type="number"
              step={0.01}
              placeholder={`Current: $${expense.amount}`}
              className="mb-4"
            />
            {errors.amount && (
              <p className="mb-4 mt-2 text-red-500">{errors.amount.message}</p>
            )}
            {errors.date && (
              <p className="mb-4 mt-2 text-red-500">{errors.date.message}</p>
            )}
            <Input
              {...register("category", { required: "Category is required" })}
              placeholder="Category"
              defaultValue={expense.category}
              className="mb-4"
            />
            {errors.category && (
              <p className="mb-4 mt-2 text-red-500">
                {errors.category.message}
              </p>
            )}
            <Input
              {...register("description")}
              placeholder="Description (optional)"
              defaultValue={expense.description || ""}
              className="mb-4"
            />
            <Button className="w-full" type="submit">
              Save Changes
            </Button>
          </form>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="mt-2">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this expense.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(expense.id)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogContent>
      </Dialog>
    </>
  );
}
