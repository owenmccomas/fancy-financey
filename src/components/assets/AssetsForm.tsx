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

interface AssetFormData {
  name: string;
  value: number;
  date: string;
  category: string;
  description?: string;
}

interface AssetsFormProps {
  onAddAsset: (newAsset: AssetFormData) => void;
}

const iconOptions = [
    { value: "Home", label: "Real Estate" },
    { value: "Car", label: "Vehicle" },
    { value: "Watch", label: "Jewelry" },
    { value: "Package", label: "Other" },
    { value: "Ship", label: "Watercraft" },
    { value: "Plane", label: "Aircraft" },
    { value: "Bike", label: "Bicycle" },
    { value: "Tv", label: "Electronics" },
    { value: "Smartphone", label: "Mobile Devices" },
    { value: "Laptop", label: "Computers" },
    { value: "Tablet", label: "Tablets" },
    { value: "Armchair", label: "Home Furnishings" },
    { value: "Brush", label: "Art" },
    { value: "Camera", label: "Photography Equipment" },
    { value: "BookOpen", label: "Books" },
    { value: "Music", label: "Musical Instruments" },
    { value: "Gift", label: "Gifts" },
    { value: "HardDrive", label: "Storage Devices" },
    { value: "Speaker", label: "Audio Equipment" },
    { value: "Drill", label: "Tools" },
    { value: "Medal", label: "Collectibles" }
  ];
  

export default function AssetsForm({ onAddAsset }: AssetsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssetFormData>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onSubmit = (data: AssetFormData) => {
    onAddAsset({
      ...data,
      category: selectedCategory,
      value: Number(data.value),
      date: new Date().toISOString(),
    });
    reset();
    setSelectedCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto min-w-[600px] max-w-[800px] space-y-4 px-4  sm:px-6 lg:px-8"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 1, message: "Name is required" },
          })}
          placeholder="e.g., Car, House, Jewelry, etc."
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="value"
          className="block text-sm font-medium text-gray-700"
        >
          Value
        </label>
        <Input
          id="value"
          type="number"
          step="0.01"
          {...register("value", {
            required: "Value is required",
            min: { value: 0.01, message: "Value must be greater than 0" },
          })}
          placeholder="Enter value"
        />
        {errors.value && (
          <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
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
        Add Asset
      </Button>
    </form>
  );
}