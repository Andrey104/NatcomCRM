import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {OrderPageComponent} from './orders/order-page/order-page.component';
import {AppRoutingModule} from './/app-routing.module';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {OrderComponent} from './orders/order/order.component';
import {OrderService} from './services/order.service';
import {MessageService} from './services/message.service';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';
import {HoverDirective} from './directives/hover.directive';
import {DealPageComponent} from './deals/deal-page/deal-page.component';
import {DealComponent} from './deals/deal/deal.component';
import {DealDetailComponent} from './deals/deal-detail/deal-detail.component';
import {DealService} from './services/deal.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {TabComponent} from './tab/tab.component';
import {PaginationDirective} from './directives/pagination.directive';
import {UtilsService} from './services/utils.service';
import {AdminGuard} from './admin.guard';
import {AdminPageComponent} from './admin/admin-page/admin-page.component';
import {ClientComponent} from './client/client.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {AuthenticationService} from './services/auntification.service';
import {ClientInfoComponent} from './client-info/client-info.component';
import {ClientService} from './services/client.service';
import {ClientNamePipe} from './pipes/client-name.pipe';
import {PhonePipe} from './pipes/phone.pipe';
import {CompanyNamePipe} from './pipes/company-name.pipe';
import {EmailPipe} from './pipes/email.pipe';
import {DateFormatPipe} from './pipes/dateFormat.pipe';
import {AddressPipe} from './pipes/address.pipe';
import {MoneyPipe} from './pipes/money.pipe';
import {MountsComponent} from './deals/mounts/mounts.component';
import {MeasurementsComponent} from './deals/measurements/measurements.component';
import {MeasurementService} from './services/measurement.service';
import {MountService} from './services/mount.service';
import {MeasurementCardComponent} from './deals/measurement-card/measurement-card.component';
import {MountDatePipe} from './pipes/mount-date.pipe';
import {NonCashPipe} from './pipes/non-cash.pipe';
import {ContractPipe} from './pipes/contract.pipe';
import {PreloaderComponent} from './preloader/preloader.component';
import {DealCommentsComponent} from './deals/deal-comments/deal-comments.component';
import {MountCardComponent} from './deals/mount-card/mount-card.component';
import {DealMeasurementComponent} from './deals/deal-measurement/deal-measurement.component';
import {DealMountComponent} from './deals/deal-mount/deal-mount.component';
import {ActionPipe} from './pipes/action.pipe';
import {CommentPipe} from './pipes/comment.pipe';
import {TransferPipe} from './pipes/transfer.pipe';
import {ImageTypePipe} from './pipes/image-type.pipe';
import {DiscountPipe} from './pipes/discount.pipe';
import {PaymentPipe} from './pipes/payment.pipe';
import {CommentComponent} from './comment/comment.component';
import {ColorCompanyDirective} from './directives/color-company.directive';
import {SettingsPageComponent} from './admin/settings-page/settings-page.component';
import {InstallerComponent} from './admin/settings-page/installers/installer/installer.component';
import {InstallersService} from './services/installers.service';
import {InstallersComponent} from './admin/settings-page/installers/installers.component';
import {BrigadesComponent} from './admin/settings-page/brigades/brigades.component';
import {CompaniesComponent} from './admin/settings-page/companies/companies.component';
import {InstallerEditComponent} from './admin/settings-page/installers/installer-edit/installer-edit.component';
import {MountStatusPipe} from './pipes/mountStatus.pipe';
import {DealClientInfoComponent} from './deals/deal-client-info/deal-client-info.component';
import {DealContractView} from './pipes/deal-contract-view.pipe';
import {StageDealComponent} from './stage-deal/stage-deal.component';
import {StageMountStatusPipe} from './pipes/stage-mount.pipe';
import {CompaniesService} from './services/companies.service';
import {CompanyComponent} from './admin/settings-page/companies/company/company.component';
import {CompanyEditComponent} from './admin/settings-page/companies/company-edit/company-edit.component';
import {BrigadeComponent} from './admin/settings-page/brigades/brigade/brigade.component';
import {StageComponent} from './stage/stage.component';
import {WorkerNamePipe} from './pipes/worker-name.pipe';
import {MeasurementStatusPipe} from './pipes/measurement-status.pipe';
import {ImageModalComponent} from './image-modal/image-modal.component';
import {MountPageComponent} from './mounts/mount-page/mount-page.component';
import {MountComponent} from './mounts/mount/mount.component';
import {MountDetailComponent} from './mounts/mount-detail/mount-detail.component';
import {StageMountService} from './services/stage-mount.service';
import {MeasurementPageComponent} from './measurements/measurement-page/measurement-page.component';
import {MeasurementDetailComponent} from './measurements/measurement-detail/measurement-detail.component';
import {MeasurementComponent} from './measurements/measurement/measurement.component';
import {BaseApi} from './core/base-api';
import {InputSearchComponent} from './input-search/input-search.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrderModalDealComponent} from './orders/order-dialog-reject/order-dialog-reject.component';
import {OrderRejectCause} from './pipes/order-cause-reject.pipe';
import {NewDealPageComponent} from './new-deal/new-deal-page/new-deal-page.component';
import {AddClientComponent} from './new-deal/add-client/add-client.component';
import {OrderDeferDialogComponent} from './orders/order-defer-dialog/order-defer-dialog.component';
import {OrderDeferCause} from './pipes/order-cause-defer.pipe';
import {DealDialogCompleteComponent} from './deals/dialogs/deal-dialog-complete/deal-dialog-complete.component';
import {DealDialogRejectComponent} from './deals/dialogs/deal-dialog-reject/deal-dialog-reject';
import {DealRejectCausePipe} from './pipes/deal-reject-cause.pipe';
import {DealDialogMeasurementComponent} from './deals/dialogs/deal-dialog-measurement/deal-dialog-measurement';
import {DealDialogPaymentComponent} from './deals/dialogs/deal-dialog-payment/deal-dialog-payment';
import {DealDialogDiscountComponent} from './deals/dialogs/deal-dialog-discount/deal-dialog-discount';
import {MountRejectCausePipe} from './pipes/mount-reject-cause.pipe';
import {MountDialogRejectComponent} from './mounts/dialogs/mount-dialog-reject/mount-dialog-reject';
import {MountDialogCompleteComponent} from './mounts/dialogs/mount-dialog-complete/mount-dialog-complete';
import {MountDialogTransferComponent} from './mounts/dialogs/mount-dialog-transfer/mount-dialog-transfer';
import {StageDialogCompleteComponent} from './stage/dialogs/stage-dialog-complete/stage-dialog-complete';
import {StageDialogCostComponent} from './stage/dialogs/stage-dialog-cost/stage-dialog-cost';
import {StageDialogTransferComponent} from './stage/dialogs/stage-dialog-transfer/stage-dialog-transfer';
import {DealDialogMountComponent} from './deals/dialogs/deal-dialog-add-mount/deal-dialog-add-mount';
import {DealDialogManagerComponent} from './deals/dialogs/deal-dialog-add-manager/deal-dialog-add-manager';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
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
    AdminPageComponent,
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
    DealCommentsComponent,
    DealMeasurementComponent,
    DealMountComponent,
    ActionPipe,
    CommentPipe,
    DealContractView,
    TransferPipe,
    ImageTypePipe,
    DiscountPipe,
    PaymentPipe,
    CommentComponent,
    ColorCompanyDirective,
    SettingsPageComponent,
    InstallerComponent,
    InstallerEditComponent,
    InstallersComponent,
    BrigadesComponent,
    CompaniesComponent,
    MountStatusPipe,
    StageDealComponent,
    StageMountStatusPipe,
    DealClientInfoComponent,
    StageComponent,
    WorkerNamePipe,
    MeasurementStatusPipe,
    ImageModalComponent,
    MountPageComponent,
    MountComponent,
    MountDetailComponent,
    MeasurementPageComponent,
    MeasurementDetailComponent,
    MeasurementComponent,
    InputSearchComponent,
    OrderModalDealComponent,
    OrderRejectCause,
    NewDealPageComponent,
    AddClientComponent,
    OrderDeferDialogComponent,
    OrderDeferCause,
    DealDialogCompleteComponent,
    CompanyComponent,
    CompanyEditComponent,
    BrigadeComponent,
    DealDialogRejectComponent,
    DealRejectCausePipe,
    DealDialogMeasurementComponent,
    DealDialogPaymentComponent,
    DealDialogDiscountComponent,
    MountRejectCausePipe,
    MountDialogRejectComponent,
    MountDialogCompleteComponent,
    MountDialogTransferComponent,
    StageDialogCompleteComponent,
    StageDialogCostComponent,
    StageDialogTransferComponent,
    DealDialogMountComponent,
    DealDialogManagerComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
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
    InstallersService,
    CompaniesService,
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
    InstallersService,
    StageMountService,
    BaseApi
  ],
  bootstrap:
    [AppComponent],
})

export class AppModule {
}
