import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ErrorComponent } from './pages/error/error.component';
import { ArticoliComponent } from './pages/articoli/articoli.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RouteGuardServiceService } from 'src/services/route-guard-service.service';
import { GridArticoliComponent } from './pages/grid-articoli/grid-articoli.component';
import { GestartComponent } from './pages/gestart/gestart.component';

const routes: Routes = [  
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'welcome/:userid', component: WelcomeComponent, canActivate: [RouteGuardServiceService]},
  { path: 'articoli', component: ArticoliComponent, canActivate: [RouteGuardServiceService]},
  { path: 'articoli/grid', component: GridArticoliComponent, canActivate: [RouteGuardServiceService]},
  { path: 'gestart/:codart', component: GestartComponent, canActivate: [RouteGuardServiceService]},
  { path: 'logout', component: LogoutComponent}, 
  { path: '**', component: ErrorComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
