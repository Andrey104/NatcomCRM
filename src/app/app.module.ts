import { BrowserModule } from '@angular/platform-browser';
import {HostBinding, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LeadComponent } from './lead/lead.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AppRoutingModule } from './/app-routing.module';
import {AuthGuard} from './auth.guard';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { OrderComponent } from './order/order.component';
import {OrderService} from './services/order.service';
import {MessageService} from './services/message.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {HoverDirective} from './directives/hover.directive';
import { DealPageComponent } from './deal-page/deal-page.component';
import { DealComponent } from './deal/deal.component';
import { DealDetailComponent } from './deal-detail/deal-detail.component';
import {DealService} from './services/deal.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TabComponent} from './tab/tab.component';
import {PaginationDirective} from './directives/pagination.directive';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    AuthGuard,
    OrderService,
    DealService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
