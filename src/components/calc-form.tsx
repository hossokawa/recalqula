"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const materiaisEncanacao = [
  { id: "ferro-fundido", nome: "Ferro fundido", rugosidade: 0.26, unidade: "mm" },
  { id: "pvc-plastico", nome: "PVC/Plástico", rugosidade: 0.0015, unidade: "mm" },
  { id: "cobre-bronze", nome: "Cobre/bronze", rugosidade: 0.0015, unidade: "mm" },
  { id: "concreto-liso", nome: "Concreto (liso)", rugosidade: 0.3, unidade: "mm" },
  { id: "aco-comercial", nome: "Aço comercial", rugosidade: 0.045, unidade: "mm" },
  { id: "ferro-galvanizado", nome: "Ferro galvanizado", rugosidade: 0.15, unidade: "mm" },
]

const unidadesVazao = [
  { id: "litro-segundo", nome: "Litro por segundo", unidade: "L/s" },
  { id: "metro-cubico-segundo", nome: "Metro cúbico por segundo", unidade: "m³/s" },
  { id: "metro-cubico-hora", nome: "Metro cúbico por hora", unidade: "m³/h" },
]

const formSchema = z.object({
  diametroSuccao: z.number({ coerce: true }).gt(0, { message: "Diâmetro da tubulação deve ser maior que zero." }),
  comprimentoSuccao: z.number({ coerce: true }).gt(0, { message: "Comprimento da tubulação deve ser maior que zero." }),
  rugosidadeSuccao: z.string().min(1, { message: "Material da tubulação de sucção é obrigatório." }),
  alturaSuccao: z.number({ coerce: true }).min(0, { message: "Altura de sucção não pode ser negativa." }),

  diametroRecalque: z.number({ coerce: true }).gt(0, { message: "Diâmetro da tubulação deve ser maior que zero." }),
  comprimentoRecalque: z.number({ coerce: true }).gt(0, { message: "Comprimento da tubulação deve ser maior que zero." }),
  rugosidadeRecalque: z.string().min(1, { message: "Material da tubulação de recalque é obrigatório." }),
  alturaRecalque: z.number({ coerce: true }).min(0, { message: "Altura de recalque não pode ser negativa." }),

  vazao: z.number({ coerce: true }).gt(0, { message: "Vazão deve ser maior que zero." }),
  unidadeVazao: z.string().min(1, { message: "Unidade de vazão é obrigatória." }),
  viscosidadeFluido: z.number({ coerce: true }).gt(0, { message: "Viscosidade do fluido deve ser maior que zero." }),
  densidadeFluido: z.number({ coerce: true }).gt(0, { message: "Densidade do fluido deve ser maior que zero." }),
})

export function CalculadoraForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diametroSuccao: 0,
      comprimentoSuccao: 0,
      rugosidadeSuccao: "",
      alturaSuccao: 0,

      diametroRecalque: 0,
      comprimentoRecalque: 0,
      rugosidadeRecalque: "",
      alturaRecalque: 0,

      vazao: 0,
      unidadeVazao: "",
      viscosidadeFluido: 0,
      densidadeFluido: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const rugosidadeSuccao = materiaisEncanacao.find(mat => mat.id === values.rugosidadeSuccao)?.rugosidade
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Calculadora de potência de bomba</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-6 rounded-md space-y-4 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-left">Dados de sucção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="diametroSuccao"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Diâmetro de sucção (mm)</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
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
                name="comprimentoSuccao"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Comprimento de sucção (m)</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Comprimento da tubulação antes da bomba.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rugosidadeSuccao"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Material da tubulação de sucção</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o material" />
                            </SelectTrigger>
                            <SelectContent>
                              {materiaisEncanacao.map((material) => (
                                <SelectItem key={material.nome} value={material.id}>
                                  {material.nome} (ε: {material.rugosidade} {material.unidade})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Material da tubulação antes da bomba. Usado para determinar a rugosidade.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alturaSuccao"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Altura de sucção (m)</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Altura da superfície do fluido até o nível da bomba.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="p-6 rounded-md space-y-4 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-left">Dados de recalque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="diametroRecalque"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Diâmetro de recalque (mm)</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
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
                name="comprimentoRecalque"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Comprimento de recalque (m)</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Comprimento da tubulação depois da bomba.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rugosidadeRecalque"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Material da tubulação de recalque</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o material" />
                            </SelectTrigger>
                            <SelectContent>
                              {materiaisEncanacao.map((material) => (
                                <SelectItem key={material.nome} value={material.id}>
                                  {material.nome} (ε: {material.rugosidade} {material.unidade})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Material da tubulação depois da bomba.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alturaSuccao"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Altura de recalque (m)</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Altura do nível da bomba até a superfície do reservatório.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="p-6 rounded-md space-y-4 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-left">Dados gerais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="densidadeFluido"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Densidade/massa específica (kg/m³)</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Densidade do fluido.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="viscosidadeFluido"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Viscosidade dinâmica (N.s/m²)</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Viscosidade do fluido.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vazao"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Vazão</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Input type="number" placeholder="0" step="any" {...field} />
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Valor da vazão.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unidadeVazao"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Vazão</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione a unidade" />
                            </SelectTrigger>
                            <SelectContent>
                              {unidadesVazao.map((unidade) => (
                                <SelectItem key={unidade.nome} value={unidade.id}>
                                  {unidade.nome} ({unidade.unidade})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </HoverCardTrigger>
                      {fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="flex justify-start">
                      Unidade de medida da vazão.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="row-start-4 col-start-2 col-end-4 text-xl bg-blue-700 hover:bg-blue-900 hover:cursor-pointer">Calcular</Button>
        </form>
      </Form>
    </div>
  )
}
