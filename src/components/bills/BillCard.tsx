import { useState } from "react";
import type { Bill } from "@prisma/client";
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

interface BillCardProps {
  bill: Bill;
  onUpdate: (updatedBill: Partial<Bill> & { id: number }) => void;
  onDelete: (id: number) => void;
}

export default function BillCard({
  bill,
  onUpdate,
  onDelete,
}: BillCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Bill>>();

  const onSubmit = (values: Partial<Bill>) => {
    const updatedValues = {
      ...values,
      dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
    };
    onUpdate({ id: bill.id, ...updatedValues });
    setIsOpen(false);
  };

  const IconComponent =
    (LucideIcons[
      bill.category as keyof typeof LucideIcons
    ] as React.ElementType) || LucideIcons.CreditCard;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card className="w-64 h-40 cursor-pointer bg-gradient-to-br from-white to-blue-50 transition hover:scale-105 hover:shadow-md">
            <CardContent className="flex flex-col h-full justify-between p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-50 p-3">
                  <IconComponent size={24} className="text-blue-600" />
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(bill.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-lg font-semibold text-gray-700 line-clamp-2">
                  {bill.title}
                </p>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  ${bill.amount.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {bill.title} Bill</DialogTitle>
            <DialogDescription>
              Update your bill here.
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
              placeholder={`Current: $${bill.amount}`}
              className="mb-4"
            />
            {errors.amount && (
              <p className="mb-4 mt-2 text-red-500">{errors.amount.message}</p>
            )}
            <Input
              {...register("dueDate", { required: "Due date is required" })}
              type="date"
              defaultValue={new Date(bill.dueDate).toISOString().split('T')[0]}
              className="mb-4"
            />
            {errors.dueDate && (
              <p className="mb-4 mt-2 text-red-500">{errors.dueDate.message}</p>
            )}
            {errors.category && (
              <p className="mb-4 mt-2 text-red-500">
                {errors.category.message}
              </p>
            )}
            <Input
              {...register("description")}
              placeholder="Description (optional)"
              defaultValue={bill.description ?? ""}
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
                  this bill.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(bill.id)}>
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