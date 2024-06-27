import { useState } from "react";
import { api } from "@/utils/api";
import { withAuth } from "@/components/withAuth";
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
import { CardSkeletonGroup } from "@/components/CardSkeleton";
import type { Expense } from "@prisma/client";

interface NewExpenseInput {
  title: string;
  amount: number;
  date: string;
  category: string;
  description?: string;
}

function Expenses() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const utils = api.useUtils();

  const { data: expenses, isLoading } = api.expenses.getAll.useQuery();
  const { data: totalExpenses } = api.expenses.getTotalExpenses.useQuery();

  const addExpenseMutation = api.expenses.create.useMutation({
    onSuccess: async () => {
      await utils.expenses.getAll.invalidate();
      await utils.expenses.getTotalExpenses.invalidate();
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
      await utils.expenses.getAll.invalidate();
      await utils.expenses.getTotalExpenses.invalidate();
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
      await utils.expenses.getAll.invalidate();
      await utils.expenses.getTotalExpenses.invalidate();
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

  const addExpense = (newExpense: NewExpenseInput) => {
    addExpenseMutation.mutate({
      ...newExpense,
      date: new Date(newExpense.date),
    });
  };

  const updateExpense = (updatedExpense: Partial<Expense> & { id: number }) => {
    const mutationInput: Partial<Expense> & { id: number } = {
      ...updatedExpense,
      date: updatedExpense.date instanceof Date 
        ? updatedExpense.date 
        : updatedExpense.date 
          ? new Date(updatedExpense.date) 
          : undefined,
    };
    updateExpenseMutation.mutate(mutationInput);
  };

  const deleteExpense = (id: number) => {
    deleteExpenseMutation.mutate({ id });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-100">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[1fr_300px]">
        <main className="flex w-full flex-col items-start justify-center gap-8 p-4 md:p-8 lg:pl-24 xl:pl-32">
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <div className="text-6xl font-bold text-gray-900 dark:text-gray-50 md:text-8xl">
              ${totalExpenses?.toFixed(2) ?? "0.00"}
            </div>
            <div className="ml-2 text-gray-500 dark:text-gray-400">
              Total Expenses
            </div>
          </div>
          {isLoading ? (
            <CardSkeletonGroup color="bg-indigo-200" />
          ) : (
            <div className="flex flex-wrap" style={{ margin: '-5px' }}>
              {expenses?.map((expense) => (
                <div key={expense.id} style={{ padding: '5px' }}>
                  <ExpenseCard
                    expense={expense}
                    onUpdate={updateExpense}
                    onDelete={deleteExpense}
                  />
                </div>
              ))}
            </div>
          )}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button onClick={() => setIsDrawerOpen(true)}>Add Expense</Button>
            </DrawerTrigger>
            <DrawerContent>
              <ExpensesForm onAddExpense={addExpense} />
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

export default withAuth(Expenses);