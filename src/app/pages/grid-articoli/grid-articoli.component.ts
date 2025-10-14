import { Component, OnInit } from '@angular/core';
import { IArticoli } from 'src/app/models/articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css']
})
export class GridArticoliComponent implements OnInit {

  articoli$: IArticoli[] = [];
  errore$: string = "";

  constructor(private articoliService: ArticoliService) { }

  ngOnInit(): void {
    this.articoliService.getArticoloByDesc('barilla').subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleResponse(response: IArticoli[]) {
    this.articoli$ = response;
  }

  handleError(errore: object) {
    this.errore$ = errore.toString();
  }

  handleEdit = (codart : string) => {
    console.log("premuto edit articolo " + codart);

  }

  handleDelete = (codart : string) => {
    console.log("premuto delete articolo " + codart);
    this.articoli$.splice(this.articoli$.findIndex(a => a.codArt === codart), 1);
    console.log(this.articoli$);
  }

}
