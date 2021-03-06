import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {DealPageComponent} from './deals/deal-page/deal-page.component';
import {OrderPageComponent} from './orders/order-page/order-page.component';
import {AdminGuard} from './admin.guard';
import {AdminPageComponent} from './admin/admin-page/admin-page.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {ClientInfoComponent} from './client-info/client-info.component';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';
import {DealDetailComponent} from './deals/deal-detail/deal-detail.component';
import {DealMeasurementComponent} from './deals/deal-measurement/deal-measurement.component';
import {DealMountComponent} from './deals/deal-mount/deal-mount.component';
import {MountPageComponent} from './mounts/mount-page/mount-page.component';
import {MeasurementPageComponent} from './measurements/measurement-page/measurement-page.component';
import {NewDealPageComponent} from './new-deal/new-deal-page/new-deal-page.component';
import {InstallersComponent} from './settings-page/installers/installers.component';
import {BrigadesComponent} from './settings-page/brigades/brigades.component';
import {CompaniesComponent} from './settings-page/companies/companies.component';
import {SettingsPageComponent} from './settings-page/settings-page.component';
import {ReviewComponent} from './admin/review/review.component';
import {DealMeasurement} from './models/deal/deal_measurement';

// import { AuthGuard } from './_guards/index';
// deals/id/mounts

const measurements_routes: Routes = [
  {path: ':measurement_id', component: DealMeasurementComponent},
  {path: ':measurement_id/deal/:id', component: DealDetailComponent},
  {path: ':measurement_id/deal/:id/mount/:mount_id', component: DealMountComponent},
  {path: ':measurement_id/deal/:id/client/:client_id', component: ClientInfoComponent}
];

const mounts_routes: Routes = [
  {path: ':mount_id', component: DealMountComponent},
  {path: ':mount_id/deal/:id', component: DealDetailComponent},
  {path: ':mount_id/deal/:id/measurement/:measurement_id', component: DealMeasurementComponent},
  {path: ':mount_id/deal/:id/client/:client_id', component: ClientInfoComponent}
];

const deals_routes: Routes = [
  {path: ':id', component: DealDetailComponent},
  {path: ':id/client/:client_id', component: ClientInfoComponent},
  {path: ':id/measurement/:measurement_id', component: DealMeasurementComponent},
  {path: ':id/mount/:mount_id', component: DealMountComponent},
];

const orders_routes: Routes = [
  {path: ':id', component: OrderDetailComponent},
  {path: ':id/to_deal', component: NewDealPageComponent},
  {path: ':id/client/:client_id', component: ClientInfoComponent},
  {path: ':id/client/:client_id/client_deal/:id', component: DealDetailComponent},
  {path: ':id/to_deal/client/:client_id', component: ClientInfoComponent },
  {
    path: ':id/client/:client_id/client_deal/:client_deal_id/measurement/:measurement_id',
    component: DealMeasurementComponent
  },
  {
    path: ':id/client/:client_id/client_deal/:client_deal_id/mount/:mount_id',
    component: DealMountComponent
  }
];

const settings_router: Routes = [
  {path: 'installers', component: InstallersComponent},
  {path: 'brigades', component: BrigadesComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: '', redirectTo: 'installers', pathMatch: 'full'}
];

const admin_routes: Routes = [
  {path: 'settings', component: SettingsPageComponent, children: settings_router},
  {path: 'review', component: ReviewComponent}
];

const pages_routes: Routes = [
  {path: 'orders/:status', component: OrderPageComponent, children: orders_routes},
  {path: 'deals/:status', component: DealPageComponent, children: deals_routes},
  {path: 'measurements/:status', component: MeasurementPageComponent, children: measurements_routes},
  {path: 'mounts/:status', component: MountPageComponent, children: mounts_routes},
  {path: 'new_deal', component: NewDealPageComponent},
  {path: 'new_deal/client/:client_id', component: ClientInfoComponent},
  {path: 'user', component: UserInfoComponent},
  {path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard], children: admin_routes},
  {path: '', redirectTo: 'user', pathMatch: 'full'}
];

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuard], children: pages_routes},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
