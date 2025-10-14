import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { SalutiDataService } from 'src/services/data/saluti-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  utente: string = "admin";
  titolo :string  = "Benvenuti in Alphashop";
  sottotitolo: string = "Visualizza le offerte del giorno";

  constructor(private route: ActivatedRoute, private salutiSrv: SalutiDataService) { }

  ngOnInit(): void {
    this.utente = this.route.snapshot.paramMap.get('userid') || "";
  }

  /*
  //getSaluti = () : void => console.log(this.salutiSrv.getSaluti());  
  getSaluti = () : void => {
    // impostiamo il metodo subscrive si effettua una chiamata asincrona
    this.salutiSrv.getSaluti().subscribe(
      // il risultato è nella variabile response
      response => console.log(response)
    );
  }
  */

  saluti : string = "";
  errore : string = "";

  getSaluti = () : void => {    
    this.salutiSrv.getSaluti(this.utente).subscribe(      
      //response => this.handleResponse(response)
      {
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      }
    );
  }

  handleResponse(response: Object) {
    this.saluti = response.toString();    
  }

  handleError(errore: Object) {
    this.errore = errore.toString();    
  }

}
