import { useState } from "react";
import { api } from "@/utils/api";
import { withAuth } from "@/components/withAuth";
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
import { CardSkeletonGroup } from "@/components/CardSkeleton";
import type { Asset } from "@prisma/client";

interface NewAssetInput {
  name: string;
  value: number;
  date: string;
  category: string;
  description?: string;
}

function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const utils = api.useUtils();

  const { data: assets, isLoading } = api.assets.getAll.useQuery();
  const { data: totalAssetValue } = api.assets.getTotalAssetValue.useQuery();

  const addAssetMutation = api.assets.create.useMutation({
    onSuccess: async () => {
      await utils.assets.getAll.invalidate();
      await utils.assets.getTotalAssetValue.invalidate();
      setIsDrawerOpen(false);
      toast({
        title: "Asset added",
        description: "Your new asset has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to add asset`,
        variant: "destructive",
      });
    },
  });

  const updateAssetMutation = api.assets.update.useMutation({
    onSuccess: async () => {
      await utils.assets.getAll.invalidate();
      await utils.assets.getTotalAssetValue.invalidate();
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
      await utils.assets.getAll.invalidate();
      await utils.assets.getTotalAssetValue.invalidate();
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

  const addAsset = (newAsset: NewAssetInput) => {
    addAssetMutation.mutate({
      ...newAsset,
      date: new Date(newAsset.date),
    });
  };

  const updateAsset = (updatedAsset: Partial<Asset> & { id: number }) => {
    const mutationInput: Partial<Asset> & { id: number } = {
      ...updatedAsset,
      date: updatedAsset.date instanceof Date 
        ? updatedAsset.date 
        : updatedAsset.date 
          ? new Date(updatedAsset.date) 
          : undefined,
    };
    updateAssetMutation.mutate(mutationInput);
  };

  const deleteAsset = (id: number) => {
    deleteAssetMutation.mutate({ id });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-amber-100">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[1fr_300px]">
        <main className="flex w-full flex-col items-start justify-center gap-8 p-4 md:p-8 lg:pl-24 xl:pl-32">
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="text-6xl font-bold text-gray-900 dark:text-gray-50 md:text-8xl">
              ${totalAssetValue?.toFixed(2) ?? "0.00"}
            </div>
            <div className="ml-2 text-gray-500 dark:text-gray-400">
              Total Asset Value
            </div>
          </div>
          {isLoading ? (
            <CardSkeletonGroup color="bg-amber-100" />
          ) : (
            <div className="flex flex-wrap" style={{ margin: "-5px" }}>
              {assets?.map((asset) => (
                <div key={asset.id} style={{ padding: "5px" }}>
                  <AssetCard
                    asset={asset}
                    onUpdate={updateAsset}
                    onDelete={deleteAsset}
                  />
                </div>
              ))}
            </div>
          )}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button onClick={() => setIsDrawerOpen(true)}>Add Asset</Button>
            </DrawerTrigger>
            <DrawerContent>
              <AssetsForm onAddAsset={addAsset} />
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    className="mx-auto w-full max-w-xs"
                    variant="outline"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </main>
        <Nav />
      </div>
    </div>
  );
}

export default withAuth(Assets);