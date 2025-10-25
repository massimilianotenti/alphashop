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
  ean: IBarcode[]
  dataCreazione: Date
  imageUrl: string
  active: boolean
  // Aggiunto le proprietà che arrivano dal backend
  // A runtime, quando ricevi i dati dal backend, l'oggetto che viene definito di tipo IArticoli
  // viene popolato znche con quelle che non prevede l'IArticoli. Se devo eliminare queste proprietà
  // le devo prevedere nell'interfaccia
  famAssort?: IFamAssort;  
  iva?: IIva;              
}

export interface IIva{
  idIva: number,
  descrizione: string,
  aliquota: number
}

export interface IFamAssort{
  idFamAss: number,
  descrizione: string
}

export interface ICat{
  id: number,
  descrizione: string
}

export interface IBarcode{
  barcode: string,
  idTipoArt: string
}