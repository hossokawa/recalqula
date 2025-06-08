import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { materiaisTubulacao } from "@/constants"

export const DadosRecalque = ({ control }) => {
  return (
    <div className="p-6 rounded-md space-y-4 border-2 border-gray-200">
      <h2 className="text-2xl font-bold text-left">Dados de recalque</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
                        {materiaisTubulacao.map((material) => (
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
          control={control}
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
  )
}
