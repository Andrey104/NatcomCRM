import {AfterViewChecked, Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MountService} from '../../services/mount.service';
import {DealMount} from '../../models/deal/deal_mount';
import {UtilsService} from '../../services/utils.service';
import {DOCUMENT} from '@angular/common';
import {DealService} from '../../services/deal.service';
import {InstallerPosition} from '../../models/installers/installer_position';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {OrderService} from '../../services/order.service';
import {MeasurementService} from '../../services/measurement.service';

@Component({
  selector: 'app-deal-mount',
  templateUrl: './deal-mount.component.html',
  styleUrls: ['./deal-mount.component.css']
})
export class DealMountComponent implements OnInit, AfterViewChecked {
  id;
  idDeal;
  url;
  backRouter;
  mount: DealMount;
  dealId;
  isSend = false;
  showEditButtons = false;
  loadPage: boolean;
  showRejectMount = false;
  showCompleteMount = false;
  showTransferMount = false;
  showSetDateMount = false;
  showAddCost = false;
  showAddCostComponent = false;
  needSubscribe = true;
  showToDealButton = true;
  showAddInstaller = false;
  updateList: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  addInstallerModalState: { open: Boolean, installers?: InstallerPosition[], stageId: string };


  constructor(private activatedRoute: ActivatedRoute,
              private mountService: MountService,
              private dealService: DealService,
              private utils: UtilsService,
              private orderService: OrderService,
              private measurementService: MeasurementService,
              @Inject(DOCUMENT) private document: Document) {
    this.url = this.document.location.href;
  }

  ngOnInit() {
    this.subscribeMount();
    this.getBackRoute();
  }

  ngAfterViewChecked(): void {
    if (this.isSend) {
      document.getElementById('page').scrollTop = document.getElementById('page').scrollHeight;
      this.isSend = false;
    }
  }

  openAddInstallerModal() {
    this.addInstallerModalState = {open: true, installers: this.mount.installers, stageId: this.mount.id.toString()};
  }

  closeAddInstallerModal(update: Boolean) {
    if (update) {
      this.successMountUpdate();
    }
  }

  successMountUpdateAndList() {
    this.loadPage = true;
    this.getMountById();
    this.updateList.next(true);
  }

  getBackRoute() {
    this.activatedRoute.params.subscribe((params) => {
      if (this.url.indexOf('client_deal') !== -1) {
        this.showToDealButton = false;
        this.backRouter = `/orders/${this.orderService.getOrderStatus()}/${params['id']}`;
        this.backRouter += `/client/${params['client_id']}/client_deal/${params['client_deal_id']}`;
      } else if (this.url.indexOf('deals') !== -1) {
        this.showToDealButton = false;
        this.backRouter = `/deals/${this.dealService.statusDeal}/${params['id']}`;
      } else if (this.url.indexOf('measurements') !== -1) {
        this.showToDealButton = false;
        this.backRouter = `/measurements/${this.measurementService.measurementStatus}/${params['measurement_id']}`;
        this.backRouter += `/deal/${params['id']}`;
      }
    });
  }


  // getBackRoute() {
  //   this.activatedRoute.params.subscribe(params => {
  //     this.idDeal = params['id'];
  //     this.id = params['mount_id'];
  //     const index = this.url.indexOf('deal/');
  //     if (index === -1) {
  //       this.backRouter = `/deals/${this.dealService.statusDeal}/${this.idDeal}`;
  //     } else {
  //       this.backRouter = `/mounts/${this.mountService.statusMount}/${this.id}/deal/${this.idDeal}`;
  //       console.log(this.backRouter);
  //     }
  //   });
  // }

  successMountUpdate() {
    this.loadPage = true;
    this.getMountById();
  }

  subscribeMount() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['mount_id'];
      this.loadPage = true;
      this.getMountById();
    });
  }

  getMountById() {
    this.mountService.getMount(this.id)
      .subscribe((mount) => {
        this.mount = mount;
        this.dealId = this.mount.deal;
        this.showEditButtons = this.utils.showEditButtons(String(this.mount.user.id));
        this.loadPage = false;
      });
  }

  sendComment(comment: string) {
    this.mountService.sendComment(this.id, comment).subscribe(
      next => {
        this.mount.comments.push(next);
        this.isSend = true;
      }, error => {
        console.log(error.error);
      });
  }
}
