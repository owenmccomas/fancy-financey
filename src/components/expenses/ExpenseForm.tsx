import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select" 

const formSchema = z.object({
  expenseName: z.string().min(2, {
    message: "Expense name must be at least 2 characters.",
  }),
  amount: z.number().min(0, {
    message: "Amount must be a positive number.",
  }),
  category: z.string().min(1, {
    message: "You must enter a category.",
  }),
})

export default function ExpensesForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseName: "",
      amount: "",
      category: "",
    },
  })

  const onSubmit = (data: Object) => {
    console.log(data)
  }

  return (
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col space-y-8 px-auto pt-8 w-[800px] ml-auto mr-auto">
          <FormField
            control={form.control}
            name="expenseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter expense name" {...field} />
                </FormControl>
                <FormDescription>
                  Name of the expense.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter amount" {...field} />
                </FormControl>
                <FormDescription>
                  Amount of the expense.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Rent</SelectItem>
                      <SelectItem value="transport">Auto</SelectItem>
                      <SelectItem value="entertainment">Utilities</SelectItem>
                      <SelectItem value="other">Groceries</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select the category of the expense.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  )
}
