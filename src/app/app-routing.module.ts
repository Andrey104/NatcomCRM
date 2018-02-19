import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth.guard';
import {DealPageComponent} from './deals/deal-page/deal-page.component';
import {OrderPageComponent} from './orders/order-page/order-page.component';
import {AdminGuard} from './admin.guard';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {ClientInfoComponent} from './client-info/client-info.component';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';
import {DealDetailComponent} from './deals/deal-detail/deal-detail.component';
import {MountsComponent} from './deals/mounts/mounts.component';
import {MeasurementsComponent} from './deals/measurements/measurements.component';

// import { AuthGuard } from './_guards/index';
// deals/id/mounts

const deals_routes: Routes = [
  { path: ':id', component: DealDetailComponent},
  { path: ':id/mounts', component: MountsComponent},
  { path: ':id/measurements', component: MeasurementsComponent }
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
