export interface IArticoli {
  codArt: string
  descrizione: string
  um: string
  codStat: string
  pzCart: number
  pesoNetto: number
  prezzo: number
  idStatoArticolo: string  
  desStatoArticolo: string
  idFamAss: number
  idIva: number
  dataCreazione: Date
  imageUrl: string
  active: boolean
}

export interface IIva{
  idIva: number
  descrizione: string
  aliquota: number
}

export interface ICat{
  id: number
  descrizione: string
}
