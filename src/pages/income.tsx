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

export default function IncomeTracker() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const { data: incomes, refetch: refetchIncomes } = api.income.getAll.useQuery();
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
    <div className="grid min-h-screen w-screen grid-cols-1 bg-gradient-to-br from-slate-50 to-green-50 md:grid-cols-[1fr_300px]">
      <main className="ml-80 flex w-full flex-col items-start justify-center gap-8 pr-80">
        <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
        {totalIncome !== undefined ? (
            <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
              {`$${totalIncome?.toFixed(2)}`}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="ml-2 text-gray-500 dark:text-gray-400">
          Total Income
        </div>
        <div className="flex w-full flex-row flex-wrap items-start gap-4">
          {incomes?.map((income) => (
            <IncomeCard
              key={income.id}
              income={income}
              onUpdate={updateIncome}
              onDelete={deleteIncome}
            />
          ))}
        </div>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button onClick={() => setIsDrawerOpen(true)}>Add Income</Button>
          </DrawerTrigger>
          <DrawerContent>
            <IncomeForm onAddIncome={addIncome} />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
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