import { useState } from "react";
import type { Income } from "@prisma/client";
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

interface IncomeCardProps {
  income: Income;
  onUpdate: (updatedIncome: Partial<Income> & { id: number }) => void;
  onDelete: (id: number) => void;
}

export default function IncomeCard({
  income,
  onUpdate,
  onDelete,
}: IncomeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Income>>();

  const onSubmit = (values: Partial<Income>) => {
    const updatedValues = {
      ...values,
      date: values.date ? new Date(values.date) : undefined,
    };
    onUpdate({ id: income.id, ...updatedValues });
    setIsOpen(false);
  };

  const IconComponent =
    (LucideIcons[
      income.source as keyof typeof LucideIcons
    ] as React.ElementType) || LucideIcons.DollarSign;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card className="w-64 cursor-pointer bg-gradient-to-br from-white to-green-50 pt-4 transition hover:scale-105 hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="mr-4 rounded-full bg-green-50 p-3">
                  <IconComponent size={32} className="text-green-600" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="mb-2 text-xl font-semibold text-gray-700">
                    {income.source}
                  </p>
                  <div className="text-3xl font-bold text-gray-900">
                    ${income.amount.toLocaleString()}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(income.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {income.source} Income</DialogTitle>
            <DialogDescription>
              Update your {income.source.toLowerCase()} income here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("amount", {
                valueAsNumber: true,
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
              })}
              type="number"
              step={0.01}
              placeholder={`Current: $${income.amount}`}
              className="mb-4"
            />
            {errors.amount && (
              <p className="mb-4 mt-2 text-red-500">{errors.amount.message}</p>
            )}
            <Input
              {...register("source", { required: "Source is required" })}
              placeholder="Source"
              defaultValue={income.source}
              className="mb-4"
            />
            {errors.source && (
              <p className="mb-4 mt-2 text-red-500">{errors.source.message}</p>
            )}
            <Input
              {...register("description")}
              placeholder="Description (optional)"
              defaultValue={income.description ?? ""}
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
                  this income entry.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(income.id)}>
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