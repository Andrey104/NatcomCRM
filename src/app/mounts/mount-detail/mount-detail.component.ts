import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StageMountService} from '../../services/stage-mount.service';
import {MountService} from '../../services/mount.service';
import {DealMount} from '../../models/deal/deal_mount';

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

  constructor(private activatedRoute: ActivatedRoute, private mountService: MountService, private stageMountService: StageMountService) {
  }

  ngOnInit() {
    this.subscribeMount();
  }

  subscribeMount() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['mount_id'];
      this.mountService.getMount(this.id).subscribe(mount => {
        this.mount = mount;
        this.dealId = String(mount.deal);
        this.stageMountService.resetStages();
        this.mount.stages.forEach((stage) => {
          this.stageMountService.putStage(stage);
        });
      });
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

  ngAfterViewChecked(): void {
    if (this.isSend) {
      document.getElementById('page').scrollTop = document.getElementById('page').scrollHeight;
      this.isSend = false;
    }
  }
}
