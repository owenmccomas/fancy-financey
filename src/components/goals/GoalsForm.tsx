import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as LucideIcons from "lucide-react";
import type { NewGoalInput, GoalFormData } from "@/types";

interface GoalsFormProps {
  onAddGoal: (newGoal: NewGoalInput) => void;
}

const categoryOptions = [
  { value: "Savings", label: "Savings" },
  { value: "Investment", label: "Investment" },
  { value: "Debt", label: "Debt Repayment" },
  { value: "Purchase", label: "Major Purchase" },
  { value: "Travel", label: "Travel" },
  { value: "Education", label: "Education" },
  { value: "Emergency", label: "Emergency Fund" },
  { value: "Retirement", label: "Retirement" },
  { value: "Other", label: "Other" },
];

export default function GoalsForm({ onAddGoal }: GoalsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GoalFormData>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onSubmit = (data: GoalFormData) => {
    onAddGoal({
      ...data,
      category: selectedCategory,
      targetAmount: Number(data.targetAmount),
      currentAmount: Number(data.currentAmount),
      priority: Number(data.priority),
      description: data.description ?? null,
    });
    reset();
    setSelectedCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-w-[600px] max-w-[800px] space-y-4 px-4 sm:px-6 lg:px-8"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          id="title"
          {...register("title", {
            required: "Title is required",
            minLength: { value: 1, message: "Title is required" },
          })}
          placeholder="e.g., Save for a new car, Pay off student loan, etc."
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="targetAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Target Amount
        </label>
        <Input
          id="targetAmount"
          type="number"
          step="0.01"
          {...register("targetAmount", {
            required: "Target amount is required",
            min: { value: 0.01, message: "Target amount must be greater than 0" },
          })}
          placeholder="Enter target amount"
        />
        {errors.targetAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.targetAmount.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="currentAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Current Amount
        </label>
        <Input
          id="currentAmount"
          type="number"
          step="0.01"
          {...register("currentAmount", {
            required: "Current amount is required",
            min: { value: 0, message: "Current amount must be 0 or greater" },
          })}
          placeholder="Enter current amount"
        />
        {errors.currentAmount && (
          <p className="mt-1 text-sm text-red-600">{errors.currentAmount.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="targetDate"
          className="block text-sm font-medium text-gray-700"
        >
          Target Date
        </label>
        <Input
          id="targetDate"
          type="date"
          {...register("targetDate", { required: "Target date is required" })}
        />
        {errors.targetDate && (
          <p className="mt-1 text-sm text-red-600">{errors.targetDate.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <Select onValueChange={setSelectedCategory} value={selectedCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => {
              const IconComponent = LucideIcons[
                option.value as keyof typeof LucideIcons
              ] as React.ElementType;
              return (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    {IconComponent && (
                      <IconComponent className="mr-2 h-4 w-4" />
                    )}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700"
        >
          Priority (1-5)
        </label>
        <Input
          id="priority"
          type="number"
          {...register("priority", {
            required: "Priority is required",
            min: { value: 1, message: "Priority must be between 1 and 5" },
            max: { value: 5, message: "Priority must be between 1 and 5" },
          })}
          placeholder="Enter priority (1-5)"
        />
        {errors.priority && (
          <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (Optional)
        </label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Enter description"
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={selectedCategory === ""}
      >
        Add Goal
      </Button>
    </form>
  );
}