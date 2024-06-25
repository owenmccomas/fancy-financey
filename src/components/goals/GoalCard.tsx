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
      targetDate: goal.targetDate.toISOString().split('T')[0],
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

  const renderInput = (name: keyof GoalFormData, label: string, type: string = "text") => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Input
        {...register(name, { required: `${label} is required` })}
        type={type}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );

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
            {renderInput("title", "Title")}
            {renderInput("targetAmount", "Target Amount", "number")}
            {renderInput("currentAmount", "Current Amount", "number")}
            {renderInput("targetDate", "Target Date", "date")}
            {renderInput("category", "Category")}
            {renderInput("priority", "Priority", "number")}
            {renderInput("description", "Description (Optional)")}
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