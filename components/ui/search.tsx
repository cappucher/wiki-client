import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'


const formSchema = z.object({
  title: z.string()
});

export function Search() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await (await fetch(`${process.env.BACKEND_URL}/search`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(values)
    })).json();
    if (!res) {
      router.push(`/wiki/${values.title.replace(/ /g, "_")}`);
      return;
    }
    router.push(`/results/${values.title.replace(/ /g, "_")}`)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field} // Connect field to Input component
                    placeholder="Insert title here..."
                    className="md:w-[100px] lg:w-[300px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
