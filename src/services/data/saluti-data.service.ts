import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalutiDataService {

  constructor(private httpClient: HttpClient) { }

  // sostituiamo la nostra chiamata hardcoded
  // getSaluti = () : string => "Saluti dal servizio SalutiDataService";
  // con la chiamata alla webapi, ma non otteniamo il risultato aspettato perchè le chiamate sono asincrone
  // getSaluti = () => this.httpClient.get('http://localhost:8050/api/saluti');
  // impostiamo la restituzione di un oggetto di tipo observable e poi impostiamo la vera modifica dove viene usato il metodo
  // otteremo comunque anche così un'errore fintanto che nel backend non abilitiamo il CORS per le chiamate
  getSaluti = (nome : string) : Observable<Object> => this.httpClient.get('http://localhost:8050/api/saluti/' + nome);

}
