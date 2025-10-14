import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthappService } from 'src/services/authapp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userid: string = "";
  password: string = "";
  autenticato: boolean = true;
  errMsg: string = "";
  titolo :string  = "Area Riservata";
  sottotitolo: string = "Inserisci le tue credenziali";

  constructor(private route: Router, private basicAuth: AuthappService) { }

  ngOnInit(): void {
  }

  gestAut() {
    if(this.basicAuth.autentica(this.userid, this.password)) {
      this.route.navigate(['welcome', this.userid]);
      this.autenticato = true;
      this.errMsg = "";
    } else {
      this.autenticato = false;
      this.errMsg = "Utente o password errati!";
    }
  }

  /*
  gestAut() {
    console.log("User Id: " + this.userid);
    console.log("Password: " + this.password);
    if (this.userid === "admin" && this.password === "admin") {
      this.route.navigate(['welcome', this.userid]);
      this.autenticato = true;
      this.errMsg = "";
    }
    else {
      this.autenticato = false;
      this.errMsg = "Utente o password errati!";
    }
  }
  */

}
