import { useState } from "react";
import type { Asset } from "@prisma/client";
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

interface AssetCardProps {
  asset: Asset;
  onUpdate: (updatedAsset: Partial<Asset> & { id: number }) => void;
  onDelete: (id: number) => void;
}

export default function AssetCard({
  asset,
  onUpdate,
  onDelete,
}: AssetCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Asset>>();

  const onSubmit = (values: Partial<Asset>) => {
    const updatedValues = {
      ...values,
      date: values.date ? new Date(values.date) : undefined,
    };
    onUpdate({ id: asset.id, ...updatedValues });
    setIsOpen(false);
  };

  const IconComponent =
    (LucideIcons[
      asset.category as keyof typeof LucideIcons
    ] as React.ElementType) || LucideIcons.Package;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Card className="w-64 h-40 cursor-pointer bg-gradient-to-br from-orange-50 to-amber-50 transition hover:scale-105 hover:shadow-md">
            <CardContent className="flex flex-col h-full justify-between p-4">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-indigo-50 p-3">
                  <IconComponent size={24} className="text-indigo-600" />
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(asset.date).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-lg font-semibold text-gray-700 line-clamp-2">
                  {asset.name}
                </p>
                <div className="text-2xl font-bold text-gray-900 mt-1">
                  ${asset.value.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {asset.name} Asset</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Asset Name"
              defaultValue={asset.name}
              className="mb-4"
            />
            {errors.name && (
              <p className="mb-4 mt-2 text-red-500">{errors.name.message}</p>
            )}
            <Input
              {...register("value", {
                valueAsNumber: true,
                required: "Value is required",
                min: { value: 0.01, message: "Value must be greater than 0" },
              })}
              type="number"
              step={0.01}
              placeholder={`Current: $${asset.value}`}
              className="mb-4"
            />
            {errors.value && (
              <p className="mb-4 mt-2 text-red-500">{errors.value.message}</p>
            )}
            {errors.category && (
              <p className="mb-4 mt-2 text-red-500">
                {errors.category.message}
              </p>
            )}
            <Input
              {...register("description")}
              placeholder="Description (optional)"
              defaultValue={asset.description ?? ""}
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
                  this asset.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(asset.id)}>
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