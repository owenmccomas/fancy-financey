import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  amount: z.number().min(0, {
    message: "Amount must be a positive number.",
  }),
});

interface FormData {
  amount: number;
}

export default function AutoForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const prevAmount = "1,500";
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Card className="col-span-2 bg-gradient-to-br from-white to-slate-50 pt-4 transition hover:scale-105 hover:shadow-md md:col-span-2">
            <CardContent className="flex flex-col items-start justify-center gap-4">
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="mb-1 flex justify-start text-2xl text-gray-500 dark:text-gray-400">
                    Auto
                  </p>
                  <div className="text-4xl font-bold text-gray-900 dark:text-gray-50">
                    $1,500
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter or Edit Monthly Auto Expenses</DialogTitle>
            <DialogDescription>
              This includes expenses for fuel, maintenance, repairs, and other
              expenses related to your monthly auto expenses.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auto Expenses</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Previous: ${prevAmount}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="mt-4 w-full" type="submit">
                Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
