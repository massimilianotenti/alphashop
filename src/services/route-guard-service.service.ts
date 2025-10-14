import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthappService } from 'src/services/authapp.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardServiceService implements CanActivate {

  constructor(private basicAuth: AuthappService, private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.basicAuth.isLogged()){
      this.route.navigate(['login']);
      return false;
    }
    else {
      return true;
    }    
    //return this.basicAuth.isLogged();
  }

  
}
