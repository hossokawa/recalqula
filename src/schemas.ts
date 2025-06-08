import { z } from "zod"

export const acessorioSchema = z.object({
  idAcessorio: z.string().min(1, { message: "Selecione um acessório." }),
  quantidade: z.number({ coerce: true }).min(1, { message: "A quantidade deve ser no mínimo 1." }).int({ message: "A quantidade deve ser um número inteiro." })
})

export const formSchema = z.object({
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

  fluido: z.string().min(1, { message: "Fluido usado no sistema é obrigatório." }),
  viscosidadeFluido: z.number({ coerce: true }).gt(0, { message: "Viscosidade do fluido deve ser maior que zero." }),
  densidadeFluido: z.number({ coerce: true }).gt(0, { message: "Densidade do fluido deve ser maior que zero." }),
  vazao: z.number({ coerce: true }).gt(0, { message: "Vazão deve ser maior que zero." }),
  unidadeVazao: z.string().min(1, { message: "Unidade de vazão é obrigatória." }),
})

