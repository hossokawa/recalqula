"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"

const formSchema = z.object({
  diametroSuccao: z.number({ coerce: true }).gt(0, { message: "Diâmetro deve ser maior que zero." }),
  diametroRecalque: z.number({ coerce: true }).gt(0, { message: "Diâmetro deve ser maior que zero." }),
  vazao: z.number({ coerce: true }).gt(0, { message: "Vazão deve ser maior que zero." }),
})

export function CalculadoraForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diametroSuccao: 0,
      diametroRecalque: 0,
      vazao: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 grid-rows-4 gap-4 space-y-4">
          <FormField
            control={form.control}
            name="diametroSuccao"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-2 w-full">
                <FormLabel>Diâmetro de sucção (mm)</FormLabel>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                  </HoverCardTrigger>
                  {fieldState.error && (
                    <HoverCardContent className="w-auto border-red-500">
                      <FormMessage className="text-white" />
                    </HoverCardContent>
                  )}
                </HoverCard>
                <FormDescription className="flex justify-start">
                  Diâmetro interno da tubulação antes da bomba.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="diametroRecalque"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-2 w-full">
                <FormLabel>Diâmetro de recalque (mm)</FormLabel>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                  </HoverCardTrigger>
                  {fieldState.error && (
                    <HoverCardContent className="w-auto border-red-500">
                      <FormMessage className="text-white" />
                    </HoverCardContent>
                  )}
                </HoverCard>
                <FormDescription className="flex justify-start">
                  Diâmetro interno da tubulação depois da bomba.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vazao"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-2 w-full">
                <FormLabel>Vazão alvo (m³/h)</FormLabel>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                  </HoverCardTrigger>
                  {fieldState.error && (
                    <HoverCardContent className="w-auto border-red-500">
                      <FormMessage className="text-white" />
                    </HoverCardContent>
                  )}
                </HoverCard>
                <FormDescription className="flex justify-start">
                  Vazão pretendida no reservatório.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="row-start-4 col-start-2 col-end-4 text-xl bg-blue-700 hover:bg-blue-900 hover:cursor-pointer">Calcular</Button>
        </div>
      </form>
    </Form>
  )
}
