import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { fluidos, unidadesVazao } from "@/constants"

export const DadosGerais = ({ control, getValues, setValue }) => {
  const [outroFluido, setOutroFluido] = useState(false)

  useEffect(() => {
    const idFluidoSelecionado = getValues("fluido")
    if (idFluidoSelecionado && idFluidoSelecionado !== "outro") {
      setOutroFluido(false)
      const fluidoSelecionado = fluidos.find(f => f.id === idFluidoSelecionado)
      if (fluidoSelecionado) {
        setValue("densidadeFluido", fluidoSelecionado.densidade)
        setValue("viscosidadeFluido", fluidoSelecionado.viscosidade_dinamica)
      }
    } else {
      setOutroFluido(true)
    }
  }, [getValues, setValue])

  return (
    <div className="p-6 rounded-md space-y-4 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-left">Dados gerais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="fluido"
          render={({ field, fieldState }) => (
            <FormItem className="w-full md:col-span-2">
              <FormLabel>Fluido</FormLabel>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <FormControl>
                    <Select onValueChange={(value) => {
                      field.onChange(value)
                      const fluidoSelecionado = fluidos.find(f => f.id === value)
                      if (fluidoSelecionado) {
                        if (fluidoSelecionado.id === "outro") {
                          setOutroFluido(true)
                          setValue("densidadeFluido", 0)
                          setValue("viscosidadeFluido", 0)
                        } else {
                          setOutroFluido(false)
                          setValue("densidadeFluido", fluidoSelecionado.densidade)
                          setValue("viscosidadeFluido", fluidoSelecionado.viscosidade_dinamica)
                        }
                      }
                    }} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o fluido do sistema" />
                      </SelectTrigger>
                      <SelectContent>
                        {fluidos.map((fluido) => (
                          <SelectItem key={fluido.nome} value={fluido.id}>
                            {fluido.nome}
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
                Fluido sendo transportado pelo sistema.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="densidadeFluido"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Densidade/massa específica (kg/m³)</FormLabel>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <FormControl>
                    <Input type="number" placeholder="0" step="any" disabled={!outroFluido} {...field} />
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
          control={control}
          name="viscosidadeFluido"
          render={({ field, fieldState }) => (
            <FormItem className="w-full">
              <FormLabel>Viscosidade dinâmica (N.s/m²)</FormLabel>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <FormControl>
                    <Input type="number" placeholder="0" step="any" disabled={!outroFluido} {...field} />
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
          control={control}
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
          control={control}
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
  )
}
