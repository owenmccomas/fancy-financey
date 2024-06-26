import { useState } from "react";
import { api } from "@/utils/api";
import BillsForm from "../components/bills/BillsForm";
import BillCard from "../components/bills/BillCard";
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

export default function Bills() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: bills,
    refetch: refetchBills,
    isLoading,
  } = api.bills.getAll.useQuery();
  const { data: totalBills } = api.bills.getTotalBills.useQuery();

  const addBillMutation = api.bills.create.useMutation({
    onSuccess: async () => {
      await refetchBills();
      setIsDrawerOpen(false);
      toast({
        title: "Bill added",
        description: "Your new bill has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to add bill`,
        variant: "destructive",
      });
    },
  });

  const updateBillMutation = api.bills.update.useMutation({
    onSuccess: async () => {
      await refetchBills();
      toast({
        title: "Bill updated",
        description: "Your bill has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to update bill`,
        variant: "destructive",
      });
    },
  });

  const deleteBillMutation = api.bills.delete.useMutation({
    onSuccess: async () => {
      await refetchBills();
      toast({
        title: "Bill deleted",
        description: "Your bill has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to delete bill`,
        variant: "destructive",
      });
    },
  });

  const addBill = (newBill: {
    title: string;
    amount: number;
    dueDate: string;
    category: string;
    description?: string;
  }) => {
    addBillMutation.mutate({
      ...newBill,
      dueDate: new Date(newBill.dueDate),
    });
  };

  const updateBill = (updatedBill: {
    id: number;
    amount?: number;
    dueDate?: Date;
    category?: string;
    description?: string | null;
  }) => {
    updateBillMutation.mutate(updatedBill);
  };

  const deleteBill = (id: number) => {
    deleteBillMutation.mutate({ id });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[1fr_300px]">
        <main className="flex w-full flex-col items-start justify-center gap-8 p-4 md:p-8 lg:pl-24 xl:pl-32">
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="text-6xl font-bold text-gray-900 dark:text-gray-50 md:text-8xl">
              ${totalBills?.toFixed(2) ?? "0.00"}
            </div>
            <div className="ml-2 text-gray-500 dark:text-gray-400">
              Total Bills
            </div>
          </div>
          {isLoading ? (
            <CardSkeletonGroup color="bg-blue-200" />
          ) : (
            <div className="flex flex-wrap" style={{ margin: "-5px" }}>
              {bills?.map((bill) => (
                <div key={bill.id} style={{ padding: "5px" }}>
                  <BillCard
                    bill={bill}
                    onUpdate={updateBill}
                    onDelete={deleteBill}
                  />
                </div>
              ))}
            </div>
          )}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button onClick={() => setIsDrawerOpen(true)}>Add Bill</Button>
            </DrawerTrigger>
            <DrawerContent>
              <BillsForm onAddBill={addBill} />
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
