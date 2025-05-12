"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  diametroSuccao: z.number().nonnegative(),
  diametroRecalque: z.number().nonnegative(),
  vazao: z.number().nonnegative("Vazão não pode ser um valor negativo."),
})

export function CalculadoraForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diametroSuccao: 20,
      diametroRecalque: 20,
      vazao: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="diametroSuccao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diâmetro tubulação de sucção</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="0">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um diâmetro" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-zinc-800">
                  <SelectItem value="0">0</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="32">32</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="60">60</SelectItem>
                  <SelectItem value="75">75</SelectItem>
                  <SelectItem value="85">85</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="150">150</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Diâmetro da tubulação antes da bomba.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="diametroRecalque"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diâmetro tubulação de sucção</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Diâmetro da tubulação depois da bomba.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vazao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diâmetro tubulação de sucção</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Vazão no reservatório em m^3/h.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Calcular</Button>
      </form>
    </Form>
  )
}
