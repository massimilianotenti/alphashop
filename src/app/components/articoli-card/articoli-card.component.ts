import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IArticoli } from 'src/app/models/articoli';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrls: ['./articoli-card.component.css']
})
export class ArticoliCardComponent implements OnInit {

  constructor(private articoliService: ArticoliService) { }

  @Input()
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
  }

  @Output()
  delete= new EventEmitter();
  @Output()
  edit= new EventEmitter();

  ngOnInit(): void {
  }

  editArt = () => {
    this.edit.emit(this.articolo.codArt);
  }

  delArt = () => {
    this.delete.emit(this.articolo.codArt);
  }

}
