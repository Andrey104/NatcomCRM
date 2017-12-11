import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LeadComponent } from './lead/lead.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AppRoutingModule } from './/app-routing.module';
import {AuthGuard} from "./auth.guard";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { OrderComponent } from './order/order.component';
import {OrderService} from "./services/order.service";
import {MessageService} from "./services/message.service";
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {HoverDirective} from "./directives/hover.directive";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LeadComponent,
    OrderPageComponent,
    LoginComponent,
    OrderComponent,
    OrderDetailComponent,
    HoverDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    OrderService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
