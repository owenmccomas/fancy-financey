import { useState } from "react";
import { api } from "@/utils/api";
import ExpenseCard from "@/components/expenses/ExpenseCard";
import ExpensesForm from "@/components/expenses/ExpensesForm";
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

export default function Expenses() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const { data: expenses, refetch: refetchExpenses } =
    api.expenses.getAll.useQuery();
  const { data: totalExpenses } = api.expenses.getTotalExpenses.useQuery();

  const addExpenseMutation = api.expenses.create.useMutation({
    onSuccess: async () => {
      await refetchExpenses();
      setIsDrawerOpen(false);
      toast({
        title: "Expense added",
        description: "Your new expense has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add expense: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateExpenseMutation = api.expenses.update.useMutation({
    onSuccess: async () => {
      await refetchExpenses();
      toast({
        title: "Expense updated",
        description: "Your expense has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update expense: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteExpenseMutation = api.expenses.delete.useMutation({
    onSuccess: async () => {
      await refetchExpenses();
      toast({
        title: "Expense deleted",
        description: "Your expense has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete expense: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const addExpense = (newExpense: {
    title: string;
    amount: number;
    date: string;
    category: string;
    description?: string;
  }) => {
    addExpenseMutation.mutate({
      ...newExpense,
      date: new Date(newExpense.date),
    });
  };

  const updateExpense = (updatedExpense: {
    id: number;
    amount?: number;
    date?: Date;
    category?: string;
    description?: string | null;
  }) => {
    updateExpenseMutation.mutate(updatedExpense);
  };

  const deleteExpense = (id: number) => {
    deleteExpenseMutation.mutate({ id });
  };

  return (
    <div className="grid min-h-screen w-screen grid-cols-1 bg-gradient-to-br from-slate-50 to-indigo-100 md:grid-cols-[1fr_300px]">
      <main className="ml-80 flex w-full flex-col items-start justify-center gap-8 pr-80">
        <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
          {totalExpenses !== undefined ? (
            <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
              {`$${totalExpenses?.toFixed(2)}`}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="ml-2 text-gray-500 dark:text-gray-400">
          Total Expenses
        </div>
        <div className="flex w-full flex-row flex-wrap items-start gap-4">
          {expenses?.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onUpdate={updateExpense}
              onDelete={deleteExpense}
            />
          ))}
        </div>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button onClick={() => setIsDrawerOpen(true)}>Add Expense</Button>
          </DrawerTrigger>
          <DrawerContent>
            <ExpensesForm onAddExpense={addExpense} />
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
