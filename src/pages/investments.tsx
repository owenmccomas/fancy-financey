import { useState } from "react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Plus, Minus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { api } from "@/utils/api";

export default function InvestmentsTracker() {
  const [input, setInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: investmentsAmount, refetch: refetchInvestments } =
    api.investments.get.useQuery();
  const { mutate: updateInvestments } = api.investments.update.useMutation({
    onSuccess: async () => {
      console.log("Investments updated successfully");
      await refetchInvestments();
    },
    onError: (error) => {
      console.error("Detailed error updating investments:", error);
      setErrorMessage(
        `An error occurred while updating investments: ${error.message}`,
      );
      setShowAlert(true);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleUpdateInvestments = (operation: "add" | "subtract") => {
    const amount = parseFloat(input);
    if (!isNaN(amount)) {
      const newAmount =
        operation === "add"
          ? (investmentsAmount ?? 0) + amount
          : Math.max((investmentsAmount ?? 0) - amount, 0);
      console.log("Attempting to update investments with amount:", newAmount);
      updateInvestments({
        type: "investment",
        name: "",
        amountInvested: newAmount,
        currentValue: newAmount,
      });
      setInput("");
      setShowAlert(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid number.");
      setShowAlert(true);
    }
  };

  return (
    <div className="grid min-h-screen w-screen grid-cols-1 bg-gradient-to-br from-slate-50 to-teal-50 md:grid-cols-[1fr_300px]">
      <main className="mx-auto ml-80 flex w-full flex-col justify-center gap-8 pl-20">
        <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
          {investmentsAmount !== undefined ? (
            <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
              {`$${investmentsAmount?.toFixed(2)}`}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="ml-2 text-gray-500 dark:text-gray-400">
          Current Investments Total
        </div>
        <Card className="w-full max-w-md bg-gradient-to-br from-white to-teal-50 transition hover:shadow-md">
          <CardHeader>
            <CardTitle>Investments Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Input
                type="number"
                placeholder="Enter amount"
                value={input}
                onChange={handleInputChange}
              />
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleUpdateInvestments("add")}
                  className="flex-1"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add
                </Button>
                <Button
                  onClick={() => handleUpdateInvestments("subtract")}
                  className="flex-1"
                  variant="secondary"
                >
                  <Minus className="mr-2 h-4 w-4" /> Subtract
                </Button>
              </div>
            </div>
            {showAlert && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
        <Nav />
      </main>
    </div>
  );
}
