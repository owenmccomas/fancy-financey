import { useState } from "react";
import { api } from "@/utils/api";
import AssetCard from "@/components/assets/AssetCard";
import AssetsForm from "@/components/assets/AssetsForm";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";

export default function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const { data: assets, refetch: refetchAssets } = api.assets.getAll.useQuery();
  const { data: totalAssetValue } = api.assets.getTotalAssetValue.useQuery();

  const addAssetMutation = api.assets.create.useMutation({
    onSuccess: async () => {
      await refetchAssets();
      setIsDrawerOpen(false);
      toast({
        title: "Asset added",
        description: "Your new asset has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add asset: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateAssetMutation = api.assets.update.useMutation({
    onSuccess: async () => {
      await refetchAssets();
      toast({
        title: "Asset updated",
        description: "Your asset has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update asset: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteAssetMutation = api.assets.delete.useMutation({
    onSuccess: async () => {
      await refetchAssets();
      toast({
        title: "Asset deleted",
        description: "Your asset has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete asset: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const addAsset = (newAsset: {
    name: string;
    value: number;
    date: string;
    category: string;
    description?: string;
  }) => {
    addAssetMutation.mutate({
      ...newAsset,
      date: new Date(newAsset.date),
    });
  };

  const updateAsset = (updatedAsset: {
    id: number;
    name?: string;
    value?: number;
    date?: Date;
    category?: string;
    description?: string | null;
  }) => {
    updateAssetMutation.mutate(updatedAsset);
  };

  const deleteAsset = (id: number) => {
    deleteAssetMutation.mutate({ id });
  };

  return (
    <div className="grid min-h-screen w-screen grid-cols-1 bg-gradient-to-br from-slate-50 to-amber-100 md:grid-cols-[1fr_300px]">
      <main className="ml-80 flex w-full flex-col items-start justify-center gap-8 pr-80">
        <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
          ${totalAssetValue?.toFixed(2) ?? "0.00"}
        </div>
        <div className="ml-2 text-gray-500 dark:text-gray-400">
          Total Asset Value
        </div>
        <div className="flex w-full flex-row flex-wrap items-start gap-4">
          {assets?.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onUpdate={updateAsset}
              onDelete={deleteAsset}
            />
          ))}
        </div>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button onClick={() => setIsDrawerOpen(true)}>Add Asset</Button>
          </DrawerTrigger>
          <DrawerContent>
            <AssetsForm onAddAsset={addAsset} />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  className="mx-auto min-w-[540px] max-w-[800px]"
                  variant="outline"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Nav />
      </main>
    </div>
  );
}
