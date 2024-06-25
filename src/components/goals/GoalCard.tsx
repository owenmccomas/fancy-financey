import { useState } from "react";
import type { Goal } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
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
import { Progress } from "@/components/ui/progress";
import type { UpdateGoalInput, GoalStatus, GoalFormData } from "@/types";

interface GoalCardProps {
    goal: Goal;
    onUpdate: (updatedGoal: UpdateGoalInput) => void;
    onDelete: (id: number) => void;
  }
  
  export default function GoalCard({
    goal,
    onUpdate,
    onDelete,
  }: GoalCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<GoalFormData>({
      defaultValues: {
        title: goal.title,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        targetDate: goal.targetDate.toISOString().split('T')[0], // Convert Date to YYYY-MM-DD string
        category: goal.category,
        priority: goal.priority,
        description: goal.description ?? undefined,
      },
    });
  
    const onSubmit = (values: GoalFormData) => {
      const updatedValues: UpdateGoalInput = {
        id: goal.id,
        ...values,
        targetDate: new Date(values.targetDate),
        status: goal.status as GoalStatus,
        description: values.description ?? null,
      };
      onUpdate(updatedValues);
      setIsOpen(false);
    };

  const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;

  const IconComponent =
    (LucideIcons[
      goal.category as keyof typeof LucideIcons
    ] as React.ElementType) || LucideIcons.Target;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card className="h-48 w-64 cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 transition hover:scale-105 hover:shadow-md">
            <CardContent className="flex h-full flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-indigo-50 p-3">
                  <IconComponent size={24} className="text-indigo-600" />
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(goal.targetDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-2">
                <p className="line-clamp-2 text-lg font-semibold text-gray-700">
                  {goal.title}
                </p>
                <Progress value={progressPercentage} className="mt-2" />
                <div className="mt-1 text-sm text-gray-600">
                  ${goal.currentAmount.toLocaleString()} / $
                  {goal.targetAmount.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {goal.title} Goal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="Goal Title"
              defaultValue={goal.title}
              className="mb-4"
            />
            {errors.title && (
              <p className="mb-4 mt-2 text-red-500">{errors.title.message}</p>
            )}
            <Input
              {...register("targetAmount", {
                valueAsNumber: true,
                required: "Target amount is required",
                min: {
                  value: 0.01,
                  message: "Target amount must be greater than 0",
                },
              })}
              type="number"
              step={0.01}
              placeholder={`Current Target: $${goal.targetAmount}`}
              className="mb-4"
            />
            {errors.targetAmount && (
              <p className="mb-4 mt-2 text-red-500">
                {errors.targetAmount.message}
              </p>
            )}
            <Input
              {...register("currentAmount", {
                valueAsNumber: true,
                required: "Current amount is required",
                min: {
                  value: 0,
                  message: "Current amount must be 0 or greater",
                },
              })}
              type="number"
              step={0.01}
              placeholder={`Current Progress: $${goal.currentAmount}`}
              className="mb-4"
            />
            {errors.currentAmount && (
              <p className="mb-4 mt-2 text-red-500">
                {errors.currentAmount.message}
              </p>
            )}
            <Input
              {...register("targetDate", {
                required: "Target date is required",
              })}
              type="date"
              defaultValue={goal.targetDate.toISOString().split("T")[0]}
              className="mb-4"
            />
            {errors.targetDate && (
              <p className="mb-4 mt-2 text-red-500">
                {errors.targetDate.message}
              </p>
            )}
            <Input
              {...register("category", { required: "Category is required" })}
              placeholder="Category"
              defaultValue={goal.category}
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
              defaultValue={goal.description ?? ""}
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
                  this goal.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(goal.id)}>
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
