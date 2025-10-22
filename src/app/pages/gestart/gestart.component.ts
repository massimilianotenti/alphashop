import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticoli } from 'src/app/models/articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent implements OnInit {

  title: string = "Modifica articoli";
  codart: string = "";
  articolo!: IArticoli;

  constructor(private route: ActivatedRoute, private articoliService: ArticoliService) { }

  ngOnInit(): void {
    this.codart = this.route.snapshot.params['codart'];
    console.log("selezionato articolo" + this.route.snapshot.params['codart']);
    this.articoliService.getArticoliByCodice(this.codart).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
      });
  }

  handleResponse(response: any): void {
    this.articolo = response;
  }

  handleError(error: any): void {
    console.log(error);
  }

}
