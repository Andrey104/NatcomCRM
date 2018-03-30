import {AfterViewChecked, Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MountService} from '../../services/mount.service';
import {DealMount} from '../../models/deal/deal_mount';
import {StageMountService} from '../../services/stage-mount.service';
import {UtilsService} from '../../services/utils.service';
import {DOCUMENT} from '@angular/common';
import {DealService} from '../../services/deal.service';

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
  showMountStageAdd = false;
  showTransferMount = false;

  constructor(private activatedRoute: ActivatedRoute,
              private mountService: MountService,
              private stageMountService: StageMountService,
              private dealService: DealService,
              private utils: UtilsService,
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

  getBackRoute() {
    this.activatedRoute.params.subscribe(params => {
      this.idDeal = params['id'];
      this.id = params['mount_id'];
      const index = this.url.indexOf('deal/');
      if (index === -1) {
        this.backRouter = `/deals/${this.dealService.statusDeal}/${this.idDeal}`;
      } else {
        this.backRouter = `/mounts/${this.mountService.statusMount}/${this.id}/deal/${this.idDeal}`;
        console.log(this.backRouter);
      }
    });
  }

  successMountUpdate() {
    this.loadPage = true;
    this.getMountById();
  }

  subscribeMount() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['mount_id'];
      this.dealId = params['id'];
      this.loadPage = true;
      this.getMountById();
    });
  }

  getMountById() {
    this.mountService.getMount(this.id)
      .subscribe((mount) => {
        this.mount = mount;
        this.stageMountService.mount = mount;
        this.showEditButtons = this.utils.showEditButtons(String(this.mount.user.id));
        this.stageMountService.resetStages();
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
