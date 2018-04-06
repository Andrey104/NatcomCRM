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
import {Picture} from '../../models/picture';
import {DomSanitizer} from '@angular/platform-browser';
import {ComponentCost} from '../../models/component-cost';
import {Cost} from '../../models/cost';

@Component({
  selector: 'app-deal-mount',
  templateUrl: './deal-mount.component.html',
  styleUrls: ['./deal-mount.component.css']
})
export class DealMountComponent implements OnInit, AfterViewChecked {
  id;
  url;
  backRouter;
  mount: DealMount;
  componentCost: ComponentCost;
  cost: Cost;
  dealId;
  picture: Picture;
  isSend = false;
  showEditButtons = false;
  loadPage: boolean;
  showRejectMount = false;
  showCompleteMount = false;
  showTransferMount = false;
  showSetDateMount = false;
  showEditMount = false;
  showAddCost = false;
  showAddCostComponent = false;
  needSubscribe = true;
  showToDealButton = true;
  showPicture = false;
  showComponentCostEdit = false;
  showCostEdit = false;
  updateList: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  addInstallerModalState: { open: Boolean, installers?: InstallerPosition[], stageId: string } = {open: false, installers: [], stageId: ''};


  constructor(private activatedRoute: ActivatedRoute,
              private mountService: MountService,
              private dealService: DealService,
              private utils: UtilsService,
              private orderService: OrderService,
              private measurementService: MeasurementService,
              @Inject(DOCUMENT) private document: Document,
              private sanitization: DomSanitizer) {
    this.url = this.document.location.href;
  }

  parseEvent(msg) {
    switch (msg.data.event) {
      case 'on_comment_mount': {
        if (msg.data.data.comment.user.id !== Number(localStorage.getItem('id_manager'))) {
          this.mount.comments.push(msg.data.data.comment);
        }
        break;
      }
    }
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

  successMountUpdate() {
    this.loadPage = true;
    this.getMountById();
  }

  showDialogComponentCost(costNumber: number) {
    this.componentCost = this.mount.component_costs[costNumber];
    this.showComponentCostEdit = true;
  }

  showDialogCost(costNumber: number) {
    this.cost = this.mount.costs[costNumber];
    this.showCostEdit = true;
  }

  successEditComponentCost() {
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
        for (const picture of this.mount.pictures) {
          picture.url = 'http://188.225.46.31' + picture.url;
        }
        this.dealId = this.mount.deal;
        this.showEditButtons = this.utils.showEditButtons(String(this.mount.user.id));
        if (localStorage.getItem('user_type') === '3') {
          this.showEditButtons = true;
        }
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

  openPicture(idPicture: number) {
    this.picture = this.mount.pictures[idPicture];
    this.showPicture = true;
  }

  getBackground(pictureUrl: String) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${pictureUrl})`);
  }

  closePicture() {
    this.picture = null;
  }
}
