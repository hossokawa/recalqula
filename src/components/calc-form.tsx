"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

const cn = (...classes) => classes.filter(Boolean).join(" ")

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

const acessoriosTubulacao = [
  { id: "valvula-gaveta-aberta", nome: "Válvula de gaverta (aberta)", valor_k: 0.2 },
  { id: "valvula-globo-aberta", nome: "Válvula de globo (aberta)", valor_k: 10 },
  { id: "valvula-retencao-aberta", nome: "Válvula de retenção (aberta)", valor_k: 2.5 },
  { id: "valvula-borboleta-aberta", nome: "Válvula borboleta (aberta)", valor_k: 0.3 },
  { id: "valvula-angulo-aberta", nome: "Válvula de ângulo (aberta)", valor_k: 5 },
  { id: "cotovelo-padrao-90", nome: "Cotovelo de 90°", valor_k: 0.9 },
  { id: "cotovelo-padrao-45", nome: "Cotovelo de 45°", valor_k: 0.4 },
  { id: "curva-padrao-90", nome: "Curva de 90°", valor_k: 0.4 },
  { id: "curva-padrao-45", nome: "Curva de 45°", valor_k: 0.2 },
  { id: "curva-padrao-22", nome: "Curva de 22.5°", valor_k: 0.1 },
  { id: "te-passagem-direta", nome: "Tê, passagem direta", valor_k: 0.6 },
  { id: "te-saida-lado", nome: "Tê, saída de lado", valor_k: 1.3 },
  { id: "te-saida-bilateral", nome: "Tê, saída bilateral", valor_k: 1.8 },
  { id: "juncao", nome: "Junção", valor_k: 0.4 },
  { id: "crivo", nome: "Crivo", valor_k: 0.75 },
  { id: "Bocais", nome: "Bocais", valor_k: 2.75 },
  { id: "ampliacao-gradual", nome: "Ampliação gradual", valor_k: 0.3 },
  { id: "reducao-gradual", nome: "Redução gradual", valor_k: 0.15 },
]

const acessorioSchema = z.object({
  idAcessorio: z.string().min(1, { message: "Selecione um acessório." }),
  quantidade: z.number({ coerce: true }).min(1, { message: "A quantidade deve ser no mínimo 1." }).int({ message: "A quantidade deve ser um número inteiro." })
})

const formSchema = z.object({
  diametroSuccao: z.number({ coerce: true }).gt(0, { message: "Diâmetro da tubulação deve ser maior que zero." }),
  comprimentoSuccao: z.number({ coerce: true }).gt(0, { message: "Comprimento da tubulação deve ser maior que zero." }),
  materialSuccao: z.string().min(1, { message: "Material da tubulação de sucção é obrigatório." }),
  alturaSuccao: z.number({ coerce: true }).min(0, { message: "Altura de sucção não pode ser negativa." }),
  acessoriosSuccao: z.array(z.object({
    idAcessorio: z.string(),
    quantidade: z.number().min(1)
  })),

  diametroRecalque: z.number({ coerce: true }).gt(0, { message: "Diâmetro da tubulação deve ser maior que zero." }),
  comprimentoRecalque: z.number({ coerce: true }).gt(0, { message: "Comprimento da tubulação deve ser maior que zero." }),
  materialRecalque: z.string().min(1, { message: "Material da tubulação de recalque é obrigatório." }),
  alturaRecalque: z.number({ coerce: true }).min(0, { message: "Altura de recalque não pode ser negativa." }),
  acessoriosRecalque: z.array(z.object({
    idAcessorio: z.string(),
    quantidade: z.number().min(1)
  })),

  vazao: z.number({ coerce: true }).gt(0, { message: "Vazão deve ser maior que zero." }),
  unidadeVazao: z.string().min(1, { message: "Unidade de vazão é obrigatória." }),
  viscosidadeFluido: z.number({ coerce: true }).gt(0, { message: "Viscosidade do fluido deve ser maior que zero." }),
  densidadeFluido: z.number({ coerce: true }).gt(0, { message: "Densidade do fluido deve ser maior que zero." }),
})

export function CalculadoraForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      diametroSuccao: 0,
      comprimentoSuccao: 0,
      materialSuccao: "",
      alturaSuccao: 0,
      acessoriosSuccao: [],

      diametroRecalque: 0,
      comprimentoRecalque: 0,
      materialRecalque: "",
      alturaRecalque: 0,
      acessoriosRecalque: [],

      vazao: 0,
      unidadeVazao: "",
      viscosidadeFluido: 0,
      densidadeFluido: 0,
    },
  })

  const formAcessorio = useForm<z.infer<typeof acessorioSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(acessorioSchema),
    defaultValues: {
      idAcessorio: "",
      quantidade: 1,
    },
  })

  const [formPrincipalEnviado, setFormPrincipalEnviado] = useState(false)

  const { fields: camposAcessoriosSuccao, append: appendSuccao, update: updateSuccao, remove: removeSuccao } = useFieldArray({
    control: form.control,
    name: "acessoriosSuccao"
  })
  const { fields: camposAcessoriosRecalque, append: appendRecalque, update: updateRecalque, remove: removeRecalque } = useFieldArray({
    control: form.control,
    name: "acessoriosRecalque"
  })

  const [modalAcessoriosSuccaoAberto, setModalAcessoriosSuccaoAberto] = useState(false)
  const [modalAcessoriosRecalqueAberto, setModalAcessoriosRecalqueAberto] = useState(false)

  function handleAcessorioSuccao(data: z.infer<typeof acessorioSchema>) {
    const idxAcessorioExistente = camposAcessoriosSuccao.findIndex((item) => item.idAcessorio === data.idAcessorio)

    if (idxAcessorioExistente !== -1) {
      // Atualizar a quantidade do acessório se já estiver na lista
      updateSuccao(idxAcessorioExistente, {
        ...camposAcessoriosSuccao[idxAcessorioExistente],
        quantidade: camposAcessoriosSuccao[idxAcessorioExistente].quantidade + data.quantidade,
      })
    } else {
      appendSuccao(data)
    }

    formAcessorio.reset()
    setModalAcessoriosSuccaoAberto(false)
  }

  function handleAcessorioRecalque(data: z.infer<typeof acessorioSchema>) {
    const idxAcessorioExistente = camposAcessoriosRecalque.findIndex((item) => item.idAcessorio === data.idAcessorio)

    if (idxAcessorioExistente !== -1) {
      // Atualizar a quantidade do acessório se já estiver na lista
      updateRecalque(idxAcessorioExistente, {
        ...camposAcessoriosRecalque[idxAcessorioExistente],
        quantidade: camposAcessoriosRecalque[idxAcessorioExistente].quantidade + data.quantidade,
      })
    } else {
      appendRecalque(data)
    }

    formAcessorio.reset()
    setModalAcessoriosRecalqueAberto(false)
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormPrincipalEnviado(true)
    console.log(values)
    const rugosidadeSuccao = materiaisEncanacao.find(mat => mat.id === values.materialSuccao)?.rugosidade
    console.log(rugosidadeSuccao)
    const rugosidadeRecalque = materiaisEncanacao.find(mat => mat.id === values.materialRecalque)?.rugosidade
    console.log(rugosidadeRecalque)
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
                      {formPrincipalEnviado && fieldState.error && (
                        <HoverCardContent className="w-auto border-red-500">
                          <FormMessage />
                        </HoverCardContent>
                      )}
                    </HoverCard>
                    <FormDescription className="text-left">
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
                    <FormDescription className="text-left">
                      Comprimento da tubulação antes da bomba.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="materialSuccao"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Material da tubulação de sucção</FormLabel>
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
                    <FormDescription className="text-left">
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
                    <FormDescription className="text-left">
                      Altura da superfície do fluido até o nível da bomba.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-md space-y-3">
            <h3 className="text-xl font-bold text-gray-800 text-left">
              Acessórios da tubulação (sucção)
            </h3>
            <Dialog open={modalAcessoriosSuccaoAberto} onOpenChange={setModalAcessoriosSuccaoAberto}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">Adicionar acessório</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar novo acessório</DialogTitle>
                  <DialogDescription>
                    Selecione o tipo de acessório e a quantidade para a tubulação de sucção.
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={formAcessorio.control}
                  name="idAcessorio"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Tipo de Acessório</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={cn("w-full", fieldState.error && "border-red-500 focus-visible:ring-red-500")}>
                            <SelectValue placeholder="Selecione um acessório" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {acessoriosTubulacao.map((acessorio) => (
                            <SelectItem key={acessorio.id} value={acessorio.id}>
                              {acessorio.nome} (K={acessorio.valor_k})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <FormMessage className="text-red-600" />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAcessorio.control}
                  name="quantidade"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          step="1"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          className={cn(fieldState.error && "border-red-500")}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-red-600" />
                      )}
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" onClick={formAcessorio.handleSubmit(handleAcessorioSuccao)}>Adicionar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {camposAcessoriosSuccao.length > 0 && (
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="grid grid-cols-5 p-2 bg-gray-200 font-semibold text-sm">
                  <div className="col-span-2">Acessório</div>
                  <div className="col-span-1 text-center">Valor K</div>
                  <div className="col-span-1 text-center">Qtd.</div>
                  <div className="col-span-1 text-center">Ações</div>
                </div>
                {camposAcessoriosSuccao.map((campoAcessorio, index) => {
                  const detalhesAcessorio = acessoriosTubulacao.find(
                    (acs) => acs.id === campoAcessorio.idAcessorio
                  );
                  if (!detalhesAcessorio) return null;

                  return (
                    <div key={campoAcessorio.id} className="grid grid-cols-5 items-center p-2 border-t border-gray-200 text-sm">
                      <div className="col-span-2">{detalhesAcessorio.nome}</div>
                      <div className="col-span-1 text-center">{detalhesAcessorio.valor_k}</div>
                      <div className="col-span-1 flex items-center justify-center space-x-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateSuccao(index, { ...campoAcessorio, quantidade: Math.max(1, campoAcessorio.quantidade - 1) })}
                        >
                          -
                        </Button>
                        <span>{campoAcessorio.quantidade}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateSuccao(index, { ...campoAcessorio, quantidade: campoAcessorio.quantidade + 1 })}
                        >
                          +
                        </Button>
                      </div>
                      <div className="col-span-1 text-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSuccao(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
                    <FormDescription className="text-left">
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
                    <FormDescription className="text-left">
                      Comprimento da tubulação depois da bomba.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="materialRecalque"
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
                    <FormDescription className="text-left">
                      Material da tubulação depois da bomba.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alturaRecalque"
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
                    <FormDescription className="text-left">
                      Altura do nível da bomba até a superfície do reservatório.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="p-4 bg-gray-100 rounded-md space-y-3 mt-6">
            <h3 className="text-xl font-bold text-gray-800 text-left">
              Acessórios da tubulação (recalque)
            </h3>

            {/* Add Discharge Accessory Dialog Trigger */}
            <Dialog open={modalAcessoriosRecalqueAberto} onOpenChange={setModalAcessoriosRecalqueAberto}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">Adicionar acessório</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar novo acessório</DialogTitle>
                  <DialogDescription>
                    Selecione o tipo de acessório e a quantidade para a tubulação de recalque.
                  </DialogDescription>
                </DialogHeader>
                <FormField
                  control={formAcessorio.control}
                  name="idAcessorio"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Tipo de Acessório</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className={cn("w-full", fieldState.error && "border-red-500 focus-visible:ring-red-500")}>
                            <SelectValue placeholder="Selecione um acessório" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {acessoriosTubulacao.map((acessorio) => (
                            <SelectItem key={acessorio.id} value={acessorio.id}>
                              {acessorio.nome} (K={acessorio.valor_k})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <FormMessage className="text-red-600" />
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAcessorio.control}
                  name="quantidade"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1"
                          step="1"
                          min="1"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          className={cn(fieldState.error && "border-red-500")}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-red-600" />
                      )}
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" onClick={formAcessorio.handleSubmit(handleAcessorioRecalque)}>Adicionar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {camposAcessoriosRecalque.length > 0 && (
              <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="grid grid-cols-5 p-2 bg-gray-200 font-semibold text-sm">
                  <div className="col-span-2">Acessório</div>
                  <div className="col-span-1 text-center">Valor K</div>
                  <div className="col-span-1 text-center">Qtd.</div>
                  <div className="col-span-1 text-center">Ações</div>
                </div>
                {camposAcessoriosRecalque.map((campoAcessorio, index) => {
                  const detalhesAcessorio = acessoriosTubulacao.find(
                    (acc) => acc.id === campoAcessorio.idAcessorio
                  );
                  if (!detalhesAcessorio) return null;

                  return (
                    <div key={campoAcessorio.id} className="grid grid-cols-5 items-center p-2 border-t border-gray-200 text-sm">
                      <div className="col-span-2">{detalhesAcessorio.nome}</div>
                      <div className="col-span-1 text-center">{detalhesAcessorio.valor_k}</div>
                      <div className="col-span-1 flex items-center justify-center space-x-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateRecalque(index, { ...campoAcessorio, quantidade: Math.max(1, campoAcessorio.quantidade - 1) })}
                        >
                          -
                        </Button>
                        <span>{campoAcessorio.quantidade}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateRecalque(index, { ...campoAcessorio, quantidade: campoAcessorio.quantidade + 1 })}
                        >
                          +
                        </Button>
                      </div>
                      <div className="col-span-1 text-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeRecalque(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
                    <FormDescription className="text-left">
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
                    <FormDescription className="text-left">
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
                    <FormDescription className="text-left">
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
                    <FormDescription className="text-left">
                      Unidade de medida da vazão.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="text-xl bg-blue-700 hover:bg-blue-900 hover:cursor-pointer">Calcular</Button>
        </form>
      </Form>
    </div>
  )
}
