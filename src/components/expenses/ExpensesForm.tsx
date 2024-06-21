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

interface ExpenseFormData {
  title: string;
  amount: number;
  date: string;
  category: string;
  description?: string;
}

interface ExpensesFormProps {
  onAddExpense: (newExpense: ExpenseFormData) => void;
}

const iconOptions = [
  { value: "Home", label: "Housing" },
  { value: "Car", label: "Auto" },
  { value: "ShoppingCart", label: "Shopping" },
  { value: "Utensils", label: "Food" },
  { value: "Briefcase", label: "Work" },
  { value: "HeartPulse", label: "Health" },
  { value: "Plane", label: "Travel" },
  { value: "Tv", label: "Entertainment" },
  { value: "GraduationCap", label: "Education" },
  { value: "Plus", label: "Other" },
];

export default function ExpensesForm({ onAddExpense }: ExpensesFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onSubmit = (data: ExpenseFormData) => {
    onAddExpense({
      ...data,
      category: selectedCategory,
      amount: Number(data.amount),
      date: Date(),
    });
    reset();
    setSelectedCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-w-[600px] max-w-[800px] space-y-4 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          id="title"
          {...register("title", {
            required: "Title is required",
            min: { value: 1, message: "Title is required" },
          })}
          placeholder={`"Auto", "Rent", "Groceries", etc.`}
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount", {
            required: "Amount is required",
            min: { value: 0.01, message: "Amount must be greater than 0" },
          })}
          placeholder="Enter amount"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>
      <div>
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
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
            {iconOptions.map((option) => {
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
        Add Expense
      </Button>
    </form>
  );
}
