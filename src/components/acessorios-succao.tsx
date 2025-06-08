import { Button } from "@/components/ui/button"
import { cn, acessoriosTubulacao } from "@/constants"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const AcessoriosSuccao = ({
  formAcessorioControl,
  handleAcessorioSuccaoSubmit,
  camposAcessoriosSuccao,
  updateSuccao,
  removeSuccao,
  modalAcessoriosSuccaoAberto,
  setModalAcessoriosSuccaoAberto
}) => {
  return (
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
            control={formAcessorioControl}
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
            control={formAcessorioControl}
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
            <Button type="button" onClick={handleAcessorioSuccaoSubmit}>Adicionar</Button>
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
  )
}
