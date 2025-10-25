import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticoli, IIva, ICat} from 'src/app/models/articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent implements OnInit {

  title: string = "Modifica articoli";
  codart: string = "";
  articolo: IArticoli = {
    codArt: '',
    descrizione: '',
    um: '',
    codStat: '',
    pzCart: 0,
    pesoNetto: 0,
    prezzo: 0,
    idStatoArticolo: '',
    desStatoArticolo: '',
    idFamAss: -1,
    idIva: -1,
    ean: [],
    dataCreazione: new Date(),
    imageUrl: '',
    active: true
  };

  Iva: IIva[] = [];
  Cat: ICat[] = [];

  ean: string = "";

  constructor(private route: ActivatedRoute, private articoliService: ArticoliService) { }

  ngOnInit(): void {
    this.codart = this.route.snapshot.params['codart'];
    console.log("selezionato articolo" + this.route.snapshot.params['codart']);
    this.articoliService.getArticoliByCodice(this.codart).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
      });

    this.articoliService.getIva().subscribe({
      next: this.handleIva.bind(this),
      error: this.handleError.bind(this)
      });

    this.articoliService.getCat().subscribe({
      next: this.handleCat.bind(this),
      error: this.handleError.bind(this)
      });
  }

  handleResponse(response: any): void {
    this.articolo = response;
    this.ean = (this.articolo.ean) ? this.articolo.ean[0].barcode : "";
    //console.log(this.articolo);
    //console.log(this.ean);
  }
  handleIva(response: any): void {
    this.Iva = response;
    //console.log(this.Iva);
  }

  handleCat(response: any): void {
    this.Cat = response;
    //console.log(this.Cat);
  }  

  handleError(error: any): void {
    console.log(error);
  }

  salva = () => {
    console.log("salva");
    // Se manipolo la categoria il frontend valorizza idFamAss. Quando Entity Framework Core esegue l'update però
    // se ha sia le FK (idFamAss), sia le proprietà di navigazione, dà precedenza alla proprietà di navigazione.
    // Rimuovo dall'oggetto che restituisco al backend famAssort ed iva per aggiornare correttamente l'articolo.
    const { famAssort, iva, ...articoloDaInviare } = this.articolo;    
    this.articoliService.updateArticolo(articoloDaInviare).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

}
