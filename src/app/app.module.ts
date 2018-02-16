import { BrowserModule } from '@angular/platform-browser';
import {HostBinding, NgModule} from '@angular/core';

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
import { DealPageComponent } from './deal-page/deal-page.component';
import { DealComponent } from './deal/deal.component';
import { DealDetailComponent } from './deal-detail/deal-detail.component';
import {DealService} from './services/deal.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TabComponent} from './tab/tab.component';
import {PaginationDirective} from './directives/pagination.directive';
import {utils} from "protractor";
import {UtilsService} from "./services/utils.service";
import { OrderDeferComponent } from './orders/order-defer/order-defer.component';
import {AdminGuard} from "./admin.guard";
import { AdminPageComponent } from './admin-page/admin-page.component';
import { OrderRejectComponent } from './orders/order-reject/order-reject.component';
import { OrderToDealComponent } from './orders/order-to-deal/order-to-deal.component';
import { ModalComponent } from './modal/modal.component';
import { ClientComponent } from './client/client.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {AuthenticationService} from './services/auntification.service';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientService } from './services/client.service';


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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
