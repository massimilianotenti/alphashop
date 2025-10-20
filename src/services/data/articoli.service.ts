import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { IArticoli } from 'src/app/models/articoli';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {

  /*
  articoli: IArticoli[]=[
    { codice:'Articolo 1', descrizione:'Descrizione articolo 1', um:'kg', pzcart:1, peso:0.5, prezzo:10.99, active:true, data:new Date(), imageUrl:'assets/images/prodotti/1.jpg' },
    { codice:'Articolo 2', descrizione:'Descrizione articolo 2', um:'kg', pzcart:1, peso:0.5, prezzo:10.99, active:true, data:new Date(), imageUrl:'assets/images/prodotti/1.jpg' },
    { codice:'Articolo 3', descrizione:'Descrizione articolo 3', um:'kg', pzcart:1, peso:0.5, prezzo:10.99, active:true, data:new Date(), imageUrl:'assets/images/prodotti/1.jpg' },
    { codice:'Articolo 4', descrizione:'Descrizione articolo 4', um:'kg', pzcart:1, peso:0.5, prezzo:10.99, active:true, data:new Date(), imageUrl:'assets/images/prodotti/1.jpg' },
    { codice:'Articolo 5', descrizione:'Descrizione articolo 5', um:'kg', pzcart:1, peso:0.5, prezzo:10.99, active:true, data:new Date(), imageUrl:'assets/images/prodotti/1.jpg' },
  ]
  */

  server: string = "localhost";
  porta: string = "5051";

  constructor(private httpClient: HttpClient) { }

  /*
  getArticoli(): IArticoli[] {
    return this.articoli;
  }
    */

  getArticoloByDesc = (descrizione: string) => {
    // Non viene immediatamente fatta la chiamata Http, viene restituito un Observable freddo che è
    // la rappresentazione di come verrà fatta la chiama.
    // Con .pipe si possono inserire operatori per modificare il flusso dei dati prima che arrivino
    // al destinatario finale.
    // La rischiesta poi verrà eseguita, tipicamente dal componente che utilizza il service con un subscribe
    return this.httpClient.get<IArticoli[]>(`http://${this.server}:${this.porta}/api/articoli/cerca/descrizione/${descrizione}`)
      .pipe(

        // Per aiutarsi con il debug è possibile utilizzare tap per stampare le informazioni ricevute
        /*
        tap(articoliRaw => {
          console.log("Dati RAW ricevuti dall'API:", articoliRaw);
          console.log("--- Analisi di idStatoArt per ogni articolo ---");
          articoliRaw.forEach((articolo, index) => {
            console.log(`Articolo #${index}: Tipo: ${typeof articolo.idStatoArticolo}, Valore: '${articolo.idStatoArticolo}'`);
          });
          console.log("---------------------------------------------");
        }),
        */
        map(response => {
          // Modifichi ogni elemento dell'array
          // Normalmente è sconsigliato modificare i dati ricevuti (mutazione), si dovrebbe modificare 
          // i dati che vengono restituiti a chi chiama il metodo
          response.forEach(item => {            
            item.idStatoArticolo = this.getDesStatoArt(item.idStatoArticolo);            
          });
          // Restituisci l'array modificato
          return response;
        })
      );
  }

  getArticoliByCodice = (codice: string) => {
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.porta}/api/articoli/cerca/codice/${codice}`)
    .pipe(        
        map(response => {                         
            response.idStatoArticolo = this.getDesStatoArt(response.idStatoArticolo);                      
          return response;
        })
      );
  }

  getArticoliByEan = (ean: string) => {
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.porta}/api/articoli/cerca/ean/${ean}`)
    .pipe(        
        map(response => {                         
            response.idStatoArticolo = this.getDesStatoArt(response.idStatoArticolo);                      
          return response;
        })
      );
  }

  getDesStatoArt = (istato: string) : string => {
    //console.log(istato);
    if (istato === '1') {
      return 'Attivo';
    } else if (istato === '2') {
      return 'Sospeso';
    } else {
      return 'Eliminato';
    }
  }
  
  delArticoliByCodArt = (codArt: string) => { 
    return this.httpClient.delete<IArticoli>(`http://${this.server}:${this.porta}/api/articoli/elimina/${codArt}`);
  }
  
  
}
