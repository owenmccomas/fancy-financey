export interface Expense {
  id: string;
  title: string;
  amount: number;
  icon: string;
}

export const expensesData: Expense[] = [
  {
    id: "rent",
    title: "Rent",
    amount: 1200,
    icon: "Home",
  },
  {
    id: "auto",
    title: "Auto",
    amount: 1500,
    icon: "Car",
  },
  {
    id: "groceries",
    title: "Groceries",
    amount: 500,
    icon: "ShoppingCart",
  },
  {
    id: "utilities",
    title: "Utilities",
    amount: 300,
    icon: "Zap",
  },
  {
    id: "extra",
    title: "Extra",
    amount: 200,
    icon: "Plus",
  },
];