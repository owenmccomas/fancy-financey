import { useState } from "react";
import { expensesData, Expense } from "../components/expenses/expensesData";
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

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(expensesData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const addExpense = (newExpense: Expense) => {
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    setIsDrawerOpen(false);
  };

  return (
    <div className="grid min-h-screen w-screen grid-cols-1 bg-gradient-to-br from-slate-50 to-indigo-50 md:grid-cols-[1fr_300px]">
      <main className="ml-80 flex w-full flex-col items-start justify-center gap-8 pr-80">
        <div className="flex w-full flex-row items-start gap-4 flex-wrap">
          {expenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onUpdate={updateExpense}
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
                <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Nav />
      </main>
    </div>
  );
}