import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth.guard';
import {DealPageComponent} from './deal-page/deal-page.component';
import {OrderPageComponent} from './orders/order-page/order-page.component';
import {AdminGuard} from './admin.guard';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {ClientInfoComponent} from './client-info/client-info.component';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';

//import { AuthGuard } from './_guards/index';

const deals_routes: Routes = [
  { path: 'processing', component: OrderPageComponent},
  { path: 'not_concluded', component: OrderPageComponent},
  { path: 'measurements', component: OrderPageComponent},
  { path: 'mount', component: OrderPageComponent},
  { path: 'completed', component: OrderPageComponent}
];


const orders_routes: Routes = [
  { path: ':id', component: OrderDetailComponent},
  { path: ':id/client/:client_id', component: ClientInfoComponent}
];


const pages_routes: Routes = [
  { path: 'deals', component: DealPageComponent, children: deals_routes},
  { path: 'orders', component: OrderPageComponent, children: orders_routes},
  { path: 'user', component: UserInfoComponent}
];

const admin_routes: Routes = [
  { path: 'deals', component: DealPageComponent, children: deals_routes},
  { path: 'orders', component: OrderPageComponent},
  { path: 'user', component: UserInfoComponent}
];

const routes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard], children: pages_routes},
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard, AdminGuard], children: admin_routes},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
