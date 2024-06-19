import AutoCard from "@/components/expenses/AutoCard";
import ExpensesForm from "@/components/expenses/ExpenseForm";
import ExtraCard from "@/components/expenses/ExtraCard";
import GroceriesCard from "@/components/expenses/GroceriesCard";
import UtilitiesCard from "@/components/expenses/UtilitiesCard";
import RentCard from "@/components/expenses/RentCard";
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
  return (
    <div className="grid min-h-screen w-screen grid-cols-1 bg-gradient-to-br from-slate-50 to-indigo-50 md:grid-cols-[1fr_300px]">
      <main className="ml-80 flex w-full flex-col items-start justify-center gap-8 pr-80">
        <div className="flex w-full flex-row items-start gap-4">
          <RentCard />
          <AutoCard />
          <GroceriesCard />
          <UtilitiesCard />
          <ExtraCard />
        </div>
        <Drawer>
          <DrawerTrigger>
            <Button>Add Expense</Button>
          </DrawerTrigger>
          <DrawerContent>
            <ExpensesForm />
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Nav />
      </main>
    </div>
  );
}
