import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LeadComponent } from './lead/lead.component';
import { OrderPageComponent } from './orders/order-page/order-page.component';
import { AppRoutingModule } from './/app-routing.module';
import {AuthGuard} from './auth.guard';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { OrderComponent } from './orders/order/order.component';
import {OrderService} from './services/order.service';
import {MessageService} from './services/message.service';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import {HoverDirective} from './directives/hover.directive';
import { DealPageComponent } from './deals/deal-page/deal-page.component';
import { DealComponent } from './deals/deal/deal.component';
import { DealDetailComponent } from './deals/deal-detail/deal-detail.component';
import {DealService} from './services/deal.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TabComponent} from './tab/tab.component';
import {PaginationDirective} from './directives/pagination.directive';
import {UtilsService} from './services/utils.service';
import { OrderDeferComponent } from './orders/order-defer/order-defer.component';
import {AdminGuard} from './admin.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { OrderRejectComponent } from './orders/order-reject/order-reject.component';
import { OrderToDealComponent } from './orders/order-to-deal/order-to-deal.component';
import { ModalComponent } from './modal/modal.component';
import { ClientComponent } from './client/client.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {AuthenticationService} from './services/auntification.service';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientService } from './services/client.service';
import { ClientNamePipe } from './pipes/client-name.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import {CompanyNamePipe} from './pipes/company-name.pipe';
import {EmailPipe} from './pipes/email.pipe';
import {DateFormatPipe} from './pipes/dateFormat.pipe';
import {AddressPipe} from './pipes/address.pipe';
import {MoneyPipe} from './pipes/money.pipe';
import { MountsComponent } from './deals/mounts/mounts.component';
import { MeasurementsComponent } from './deals/measurements/measurements.component';
import {MeasurementService} from './services/measurement.service';
import {MountService} from './services/mount.service';
import { MeasurementCardComponent } from './deals/measurement-card/measurement-card.component';
import { MountDatePipe } from './pipes/mount-date.pipe';
import { NonCashPipe } from './pipes/non-cash.pipe';
import { ContractPipe } from './pipes/contract.pipe';
import { PreloaderComponent } from './preloader/preloader.component';
import { ObjectStagesComponent } from './deals/object-stages/object-stages.component';
import { DealCommentsComponent } from './deals/deal-comments/deal-comments.component';
import { DealDiscountsComponent } from './deals/deal-discounts/deal-discounts.component';
import { DealPaymentsComponent } from './deals/deal-payments/deal-payments.component';
import {MountCardComponent} from './deals/mount-card/mount-card.component';
import { DealMeasurementComponent } from './deals/deal-measurement/deal-measurement.component';
import { DealMountComponent } from './deals/deal-mount/deal-mount.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LeadComponent,
    OrderPageComponent,
    LoginComponent,
    OrderComponent,
    OrderDetailComponent,
    HoverDirective,
    DealPageComponent,
    DealComponent,
    DealDetailComponent,
    TabComponent,
    PaginationDirective,
    OrderDeferComponent,
    AdminPageComponent,
    OrderRejectComponent,
    OrderToDealComponent,
    ModalComponent,
    ClientComponent,
    UserInfoComponent,
    ClientInfoComponent,
    ClientNamePipe,
    PhonePipe,
    CompanyNamePipe,
    EmailPipe,
    DateFormatPipe,
    AddressPipe,
    MoneyPipe,
    MountsComponent,
    MeasurementsComponent,
    MeasurementCardComponent,
    MountCardComponent,
    MountDatePipe,
    NonCashPipe,
    ContractPipe,
    PreloaderComponent,
    ObjectStagesComponent,
    DealCommentsComponent,
    DealDiscountsComponent,
    DealPaymentsComponent,
    DealMeasurementComponent,
    DealMountComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    OrderService,
    DealService,
    MessageService,
    UtilsService,
    AuthenticationService,
    ClientService,
    MeasurementService,
    MountService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
