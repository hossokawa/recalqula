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

  interface ResultadoCalculo {
    sucesso: boolean
    mensagem: string
    received_data: any

    potencia_estimada: number
    altura_manometrica: number
    vazao: number

    velocidade_succao: number
    reynolds_succao: number
    tipo_fluxo_succao: string
    fator_atrito_succao: number
    perda_carga_continua_succao: number
    perda_carga_localizada_succao: number
    perda_carga_total_succao: number

    velocidade_recalque: number
    reynolds_recalque: number
    tipo_fluxo_recalque: string
    fator_atrito_recalque: number
    perda_carga_continua_recalque: number
    perda_carga_localizada_recalque: number
    perda_carga_total_recalque: number

    perda_carga_total: number
  }

  const [modalAcessoriosSuccaoAberto, setModalAcessoriosSuccaoAberto] = useState(false)
  const [modalAcessoriosRecalqueAberto, setModalAcessoriosRecalqueAberto] = useState(false)

  const [resultadoCalculo, setResultadoCalculo] = useState<ResultadoCalculo | null>(null)
  const [carregandoResultado, setCarregandoResultado] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setCarregandoResultado(true)
    setErro(null)
    setResultadoCalculo(null)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/calculate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        const erro = await response.json()
        throw new Error(erro.data || "Erro ao calcular a potência.")
      }

      const data = await response.json()
      setResultadoCalculo(data)
      console.log("Cálculado bem-sucedido:", data)
    } catch (err) {
      console.error("Erro durante o cálculo:", err)
      console.log(JSON.stringify(values))
    } finally {
      setCarregandoResultado(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Calculadora de potência de bomba</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" method="post">
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
          <Button type="submit" className="text-xl bg-blue-700 hover:bg-blue-900 hover:cursor-pointer">
            {carregandoResultado ? "Calculando..." : "Calcular"}
          </Button>
          {carregandoResultado && (
            <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md text-center">
              Aguardando resultado...
            </div>
          )}
          {erro && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-center">
              Erro: {erro}
            </div>
          )}
          {resultadoCalculo && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md shadow-md text-center">
              <h3 className="font-bold text-lg">Resultados dos cálculos:</h3>
              <p className="text-sm text-green-700 mb-1">{resultadoCalculo.mensagem}</p>
              <hr />
              <p className="text-md text-green-700 font-bold">Dados calculados de sucção</p>
              <p>Velocidade: <span className="font-semibold">{resultadoCalculo.velocidade_succao} m/s</span></p>
              <p>Número de Reynolds: <span className="font-semibold">{resultadoCalculo.reynolds_succao}</span></p>
              <p>Tipo de escoamento: Escoamento <span className="font-semibold">{resultadoCalculo.tipo_fluxo_succao}</span></p>
              <p>Fator de atrito: <span className="font-semibold">{resultadoCalculo.fator_atrito_succao}</span></p>
              <p>Perda de carga contínua: <span className="font-semibold">{resultadoCalculo.perda_carga_continua_succao} m</span></p>
              <p>Perda de carga localizada: <span className="font-semibold">{resultadoCalculo.perda_carga_localizada_succao} m</span></p>
              <p>Perda de carga total: <span className="font-semibold">{resultadoCalculo.perda_carga_total_succao} m</span></p>
              <hr />
              <p className="text-md text-green-700 font-bold">Dados calculados de recalque</p>
              <p>Velocidade: <span className="font-semibold">{resultadoCalculo.velocidade_recalque} m/s</span></p>
              <p>Número de Reynolds: <span className="font-semibold">{resultadoCalculo.reynolds_recalque}</span></p>
              <p>Tipo de escoamento: Escoamento <span className="font-semibold">{resultadoCalculo.tipo_fluxo_recalque}</span></p>
              <p>Fator de atrito: <span className="font-semibold">{resultadoCalculo.fator_atrito_recalque}</span></p>
              <p>Perda de carga contínua: <span className="font-semibold">{resultadoCalculo.perda_carga_continua_recalque} m</span></p>
              <p>Perda de carga localizada: <span className="font-semibold">{resultadoCalculo.perda_carga_localizada_recalque} m</span></p>
              <p>Perda de carga total: <span className="font-semibold">{resultadoCalculo.perda_carga_total_recalque} m</span></p>
              <hr />
              <p className="text-md text-green-700 font-bold">Dados da bomba/gerais</p>
              <p>Vazão: <span className="font-semibold">{resultadoCalculo.vazao} m³/h</span></p>
              <p>Altura manométrica: <span className="font-semibold">{resultadoCalculo.altura_manometrica} m</span></p>
              <p>Potência estimada: <span className="font-semibold">{resultadoCalculo.potencia_estimada} kW</span></p>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}
