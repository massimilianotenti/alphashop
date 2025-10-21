import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("selezionato articolo" + this.route.snapshot.params['codart']);
  }

}
