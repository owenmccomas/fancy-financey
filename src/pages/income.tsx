import { useState } from "react";
import { api } from "@/utils/api";
import IncomeCard from "@/components/income/IncomeCard";
import IncomeForm from "@/components/income/IncomeForm";
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

export default function IncomeTracker() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const {
    data: incomes,
    refetch: refetchIncomes,
    isLoading,
  } = api.income.getAll.useQuery();
  const { data: totalIncome } = api.income.getTotalIncome.useQuery();

  const addIncomeMutation = api.income.create.useMutation({
    onSuccess: async () => {
      await refetchIncomes();
      setIsDrawerOpen(false);
      toast({
        title: "Income added",
        description: "Your new income has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add income: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateIncomeMutation = api.income.update.useMutation({
    onSuccess: async () => {
      await refetchIncomes();
      toast({
        title: "Income updated",
        description: "Your income has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update income: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteIncomeMutation = api.income.delete.useMutation({
    onSuccess: async () => {
      await refetchIncomes();
      toast({
        title: "Income deleted",
        description: "Your income has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete income: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const addIncome = (newIncome: {
    amount: number;
    date: string;
    source: string;
    description?: string;
  }) => {
    addIncomeMutation.mutate({
      ...newIncome,
      date: new Date(newIncome.date),
    });
  };

  const updateIncome = (updatedIncome: {
    id: number;
    amount?: number;
    date?: Date;
    source?: string;
    description?: string | null;
  }) => {
    updateIncomeMutation.mutate(updatedIncome);
  };

  const deleteIncome = (id: number) => {
    deleteIncomeMutation.mutate({ id });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-green-50">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[1fr_300px]">
        <main className="flex w-full flex-col items-start justify-center gap-8 p-4 md:p-8 lg:pl-24 xl:pl-32">
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="text-6xl font-bold text-gray-900 dark:text-gray-50 md:text-8xl">
              ${totalIncome?.toFixed(2) ?? "0.00"}
            </div>
            <div className="ml-2 text-gray-500 dark:text-gray-400">
              Total Income
            </div>
          </div>
          {isLoading ? (
            <CardSkeletonGroup color="bg-green-100" />
          ) : (
            <div className="flex flex-wrap" style={{ margin: "-5px" }}>
              {incomes?.map((income) => (
                <div key={income.id} style={{ padding: "5px" }}>
                  <IncomeCard
                    income={income}
                    onUpdate={updateIncome}
                    onDelete={deleteIncome}
                  />
                </div>
              ))}
            </div>
          )}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button onClick={() => setIsDrawerOpen(true)}>Add Income</Button>
            </DrawerTrigger>
            <DrawerContent>
              <IncomeForm onAddIncome={addIncome} />
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
