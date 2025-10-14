import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor() { }

  autentica (user: string, pwd: string): boolean {
    var retVal = (user === "admin" && pwd === "admin") ? true : false;
    if(retVal) {
      console.log("Salvo user in sessionStorage");
      sessionStorage.setItem("user", user);
    }
    return retVal;
  }
  
  loggedUser(): string | null {
    return sessionStorage.getItem("user");
  }
  
  isLogged(): boolean {
    return this.loggedUser() !== null;
  }

  logout(): void {
    sessionStorage.removeItem("user");
  }

  clearAll(): void {
    sessionStorage.clear();
  }
  
}
