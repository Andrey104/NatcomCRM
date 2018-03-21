import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StageMountService} from '../../services/stage-mount.service';
import {MountService} from '../../services/mount.service';
import {DealMount} from '../../models/deal/deal_mount';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-mount-detail',
  templateUrl: './mount-detail.component.html',
  styleUrls: ['./mount-detail.component.css']
})
export class MountDetailComponent implements OnInit, AfterViewChecked {
  id;
  mount: DealMount;
  dealId;
  isSend = false;
  showEditButtons = false;
  loadPage: boolean;
  showRejectMount = false;
  showCompleteMount = false;
  showTransferMount = false;
  showAddStage = false;
  needSubscribe = true;
  updateList: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private activatedRoute: ActivatedRoute,
              private mountService: MountService,
              private stageMountService: StageMountService,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.subscribeMount();
  }

  ngAfterViewChecked(): void {
    if (this.isSend) {
      document.getElementById('page').scrollTop = document.getElementById('page').scrollHeight;
      this.isSend = false;
    }
  }

  successMountUpdate() {
    this.updateList.next(true);
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
        this.showEditButtons = this.utils.showEditButtons(String(this.mount.user.id));
        this.stageMountService.mount = mount;
        this.dealId = String(mount.deal);
        this.stageMountService.resetStages();
        this.mount.stages.forEach((stage) => {
          this.stageMountService.putStage(stage);
        });
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
