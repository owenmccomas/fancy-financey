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

interface IncomeFormData {
  amount: number;
  date: string;
  description?: string;
  source: string;
}

interface IncomeFormProps {
  onAddIncome: (newIncome: IncomeFormData) => void;
}

const sourceOptions = [
  { value: "Salary", label: "Salary" },
  { value: "Freelance", label: "Freelance" },
  { value: "Investment", label: "Investment" },
  { value: "Rental", label: "Rental" },
  { value: "Other", label: "Other" },
];

export default function IncomeForm({ onAddIncome }: IncomeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IncomeFormData>();
  const [selectedSource, setSelectedSource] = useState<string>("");

  const onSubmit = (data: IncomeFormData) => {
    onAddIncome({
      ...data,
      source: selectedSource,
      amount: Number(data.amount),
      date: new Date().toISOString(),
    });
    reset();
    setSelectedSource("");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-w-[600px] max-w-[800px] space-y-4 px-4 py-10 sm:px-6 lg:px-8"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Monthly Amount</label>
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
        <label
          htmlFor="source"
          className="block text-sm font-medium text-gray-700"
        >
          Source
        </label>
        <Select onValueChange={setSelectedSource} value={selectedSource}>
          <SelectTrigger id="source">
            <SelectValue placeholder="Select an income source" />
          </SelectTrigger>
          <SelectContent>
            {sourceOptions.map((option) => {
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
        disabled={selectedSource === ""}
      >
        Add Income
      </Button>
    </form>
  );
}