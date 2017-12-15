import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./auth.guard";
import {DealPageComponent} from './deal-page/deal-page.component';
import {OrderPageComponent} from "./order-page/order-page.component";

//import { AuthGuard } from './_guards/index';

const pages_routes: Routes = [
  { path: 'deals', component: DealPageComponent},
  { path: 'orders', component: OrderPageComponent},
];

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard], children: pages_routes},
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
