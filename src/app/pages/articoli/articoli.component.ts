import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { IArticoli } from 'src/app/models/articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent implements OnInit {

  /*
    Prima versione hardcoded  

    articoli = [
    { codice:'Articolo 1', descrizione:'Descrizione articolo 1', prezzo:10.99 },
    { codice:'Articolo 2', descrizione:'Descrizione articolo 2', prezzo:20.99 },
    { codice:'Articolo 3', descrizione:'Descrizione articolo 3', prezzo:30.99 },
    { codice:'Articolo 4', descrizione:'Descrizione articolo 4', prezzo:40.99 },
    { codice:'Articolo 5', descrizione:'Descrizione articolo 5', prezzo:50.99 }
  ];*/
  /*
    Seconda versione hardcoded con IArticoli

    articoli: IArticoli[] = [
    { codice:'Articolo 1', descrizione:'Descrizione articolo 1', prezzo:10.99, active:true, data:new Date(), um:'kg', pzcart:1, peso:0.5, imageUrl:'asset/images/prodotti/1.jpg' },
    { codice:'Articolo 2', descrizione:'Descrizione articolo 2', prezzo:20.99, active:true, data:new Date(), um:'kg', pzcart:1, peso:0.5, imageUrl:'asset/images/prodotti/1.jpg' },
    { codice:'Articolo 3', descrizione:'Descrizione articolo 3', prezzo:30.99, active:true, data:new Date(), um:'kg', pzcart:1, peso:0.5, imageUrl:'asset/images/prodotti/1.jpg' },
    { codice:'Articolo 4', descrizione:'Descrizione articolo 4', prezzo:40.99, active:true, data:new Date(), um:'kg', pzcart:1, peso:0.5, imageUrl:'asset/images/prodotti/1.jpg' },
    { codice:'Articolo 5', descrizione:'Descrizione articolo 5', prezzo:50.99, active:true, data:new Date(), um:'kg', pzcart:1, peso:0.5, imageUrl:'asset/images/prodotti/1.jpg' }
  ]*/
  articoli$: IArticoli[] = [];
  errore$: string = "";

  pagina: number = 1;
  righe: number = 10;

  filter$: Observable<string | null> = of('');
  filter: string | null = "";

  filterType: number = 0;

  constructor(private articoliService: ArticoliService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*
    this.articoliService.getArticoloByDesc('barilla').subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
    */
   this.filter$ = this.route.queryParamMap.pipe(
    map((params: ParamMap) => params.get('filter')),
   )

   //this.filter$.subscribe(param => (console.log(param)));
   this.filter$.subscribe(param => (this.filter = param));

   // if (this.filter) è una scorciatoia molto comune che equivale a scrivere: 
   // if (this.filter !== null && this.filter !== "")
   if(this.filter)
    this.getArticoli(this.filter);
  }

  getArticoli = (filter: string) => {
    this.articoli$ = [];
    
    if (this.filterType == 0) {
     this.articoliService.getArticoliByCodice(filter).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
    else if (this.filterType == 1) {
      this.articoliService.getArticoloByDesc(filter).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
    else if (this.filterType == 2) {
      this.articoliService.getArticoliByEan(filter).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
  }

  refresh = () => {
    this.getArticoli(this.filter!);
  }

  handleResponse(response: any): void {
    if(this.filterType == 0 || this.filterType == 2)
    {
      // Dichiara un nuovo array di tipo IArticoli[] ed aggiunge a tutti gli 
      // elementi di ...this.articoli$ il nuovo elemento response
      let newArray : IArticoli[] = [...this.articoli$, response];
      this.articoli$ = newArray;
    }
    else
      this.articoli$ = response;

    this.filterType = 0;
  }

  handleError(errore: any): void {
    if(this.filter && this.filterType == 0)
    {
      this.filterType = 1;
      this.getArticoli(this.filter);
    }
    else if(this.filter && this.filterType == 1)
    {
      this.filterType = 2;
      this.getArticoli(this.filter);
    }
    else 
    {
      console.log(errore);
      this.errore$ = errore.error.message;
      console.log(this.errore$);
      this.filterType = 0;
    }    
  }

}
