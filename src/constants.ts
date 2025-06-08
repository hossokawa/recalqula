export const cn = (...classes) => classes.filter(Boolean).join(" ")

export const materiaisTubulacao = [
  { id: "ferro-fundido", nome: "Ferro fundido", rugosidade: 0.26, unidade: "mm" },
  { id: "pvc-plastico", nome: "PVC/Plástico", rugosidade: 0.0015, unidade: "mm" },
  { id: "cobre-bronze", nome: "Cobre/bronze", rugosidade: 0.0015, unidade: "mm" },
  { id: "concreto-liso", nome: "Concreto (liso)", rugosidade: 0.3, unidade: "mm" },
  { id: "aco-comercial", nome: "Aço comercial", rugosidade: 0.045, unidade: "mm" },
  { id: "ferro-galvanizado", nome: "Ferro galvanizado", rugosidade: 0.15, unidade: "mm" },
]

export const acessoriosTubulacao = [
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
  { id: "bocais", nome: "Bocais", valor_k: 2.75 },
  { id: "ampliacao-gradual", nome: "Ampliação gradual", valor_k: 0.3 },
  { id: "reducao-gradual", nome: "Redução gradual", valor_k: 0.15 },
]

export const fluidos = [
  { id: "agua_20c", nome: "Água (20°C)", densidade: 998, viscosidade_dinamica: 0.001002 },
  { id: "oleo_iso_vg46", nome: "Óleo ISO VG 46", densidade: 870, viscosidade_dinamica: 0.041 },
  { id: "oleo_sae_30", nome: "Óleo SAE 30", densidade: 875, viscosidade_dinamica: 0.29 },
  { id: "glicerina", nome: "Glicerina", densidade: 1260, viscosidade_dinamica: 1.49 },
  { id: "oleo_vegetal", nome: "Óleo vegetal", densidade: 920, viscosidade_dinamica: 0.065 },
  { id: "outro", nome: "Outro", densidade: 0, viscosidade_dinamica: 0 },
]

export const unidadesVazao = [
  { id: "litro-segundo", nome: "Litro por segundo", unidade: "L/s" },
  { id: "metro-cubico-segundo", nome: "Metro cúbico por segundo", unidade: "m³/s" },
  { id: "metro-cubico-hora", nome: "Metro cúbico por hora", unidade: "m³/h" },
]
