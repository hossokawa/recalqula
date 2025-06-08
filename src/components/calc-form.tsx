"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { acessorioSchema, formSchema } from "@/schemas"
import { DadosSuccao } from "./dados-succao"
import { AcessoriosSuccao } from "./acessorios-succao"
import { DadosRecalque } from "./dados-recalque"
import { AcessoriosRecalque } from "./acessorios-recalque"
import { DadosGerais } from "./dados-gerais"

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

      fluido: "agua_20c",
      viscosidadeFluido: 0,
      densidadeFluido: 0,
      vazao: 0,
      unidadeVazao: "",
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
    console.log(rugosidadeSuccao)
    console.log(rugosidadeRecalque)
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Calculadora de potência de bomba</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DadosSuccao control={form.control} />
          <AcessoriosSuccao
            formAcessorioControl={formAcessorio.control}
            handleAcessorioSuccaoSubmit={formAcessorio.handleSubmit(handleAcessorioSuccao)}
            camposAcessoriosSuccao={camposAcessoriosSuccao}
            updateSuccao={updateSuccao}
            removeSuccao={removeSuccao}
            modalAcessoriosSuccaoAberto={modalAcessoriosSuccaoAberto}
            setModalAcessoriosSuccaoAberto={setModalAcessoriosSuccaoAberto}
          />
          <DadosRecalque control={form.control} />
          <AcessoriosRecalque
            formAcessorioControl={formAcessorio.control}
            handleAcessorioRecalqueSubmit={formAcessorio.handleSubmit(handleAcessorioRecalque)}
            camposAcessoriosRecalque={camposAcessoriosRecalque}
            updateRecalque={updateRecalque}
            removeRecalque={removeRecalque}
            modalAcessoriosRecalqueAberto={modalAcessoriosRecalqueAberto}
            setModalAcessoriosRecalqueAberto={setModalAcessoriosRecalqueAberto}
          />
          <DadosGerais control={form.control} getValues={form.getValues} setValue={form.setValue} />
          <Button type="submit" className="text-xl bg-blue-700 hover:bg-blue-900 hover:cursor-pointer">Calcular</Button>
        </form>
      </Form>
    </div>
  )
}
