import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StageMountService} from '../services/stage-mount.service';
import {MountStage} from '../models/mount/mount-stage';
import {DealMount} from '../models/deal/deal_mount';
import {MountService} from '../services/mount.service';
import {UtilsService} from '../services/utils.service';
import {Cost} from '../models/cost';
import {DOCUMENT} from '@angular/common';
import {DealService} from '../services/deal.service';
import {InstallerPosition} from '../models/installers/installer_position';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  id: number;
  idMount: number;
  idDeal: number;
  statusMount;
  statusDeal;
  url;
  stage: MountStage;
  mount: DealMount;
  showEditButtons = false;
  isNothingToShow = false;
  showCompleteStage = false;
  showTransferStage = false;
  showAddCost = false;
  showAddInstaller = false;
  backRouter = '';
  addInstallerModalState: { open: Boolean, installers?: InstallerPosition[], stageId: string };

  constructor(private activatedRoute: ActivatedRoute,
              private stageMountService: StageMountService,
              private mountService: MountService,
              private utils: UtilsService,
              private dealService: DealService,
              @Inject(DOCUMENT) private document: Document) {
    this.url = this.document.location.href;
  }

  ngOnInit() {
    this.getRouter();
    this.addInstallerModalState = {open: false, installers: null, stageId: ''};
    console.log(typeof this.stage);
    this.getStage();
  }

  openAddInstallerModal() {
    this.addInstallerModalState = {open: true, installers: this.stage.installers, stageId: this.stage.id.toString()};
  }

  closeAddInstallerModal(update: Boolean) {
    if (update) {
      this.updateStages(this.idMount);
    }
  }

  getRouter() {
    this.activatedRoute.params.subscribe(params => {
        this.idMount = params['mount_id'];
      if (params['mount_id'] && params['id']) {
        this.idDeal = params['id'];
        const index = this.url.indexOf('mounts');
        console.log(index + 'index авыпщфыпхыопз');
        if (index === -1) {
          this.statusDeal = this.dealService.statusDeal;
          this.backRouter = `/deals/${this.statusDeal}/${this.idDeal}/mount/${this.idMount}`;
        } else {
          this.statusMount = this.mountService.statusMount;
          this.backRouter = `/mounts/${this.statusMount}/${this.idMount}/deal/${this.idDeal}/mount/${this.idMount}`;
        }
      } else {
        this.statusMount = this.mountService.statusMount;
        this.backRouter = `/mounts/${this.statusMount}/${this.idMount}`;
      }
    });
  }

  successStageUpdate() {
    this.stage = null;
    this.stageMountService.getStage(this.id)
      .subscribe(result => {
        this.stage = result;
      }, error2 => {
        alert('Произошла ошибка');
      });
  }

  successStageCost(cost: Cost) {
    this.successStageUpdate();
  }

  getStage() {
    this.activatedRoute.params.subscribe(params => {
      this.id = Number(params['stage_id']);
      if (this.stageMountService.stages.length !== 0) {
        this.stageMountService.stages.forEach((stage) => {
          if (stage.id === this.id) {
            this.showEditButtons = this.utils.showEditButtons(String(this.stageMountService.mount.user.id));
            this.stage = stage;
          }
        });
      } else {
        // если решили обновить страницу - запросим заново монтаж и закинем его стадии в сервис стадий
        this.activatedRoute.params.subscribe(params2 => {
          this.idMount = Number(params2['mount_id']);
        });
        this.updateStages(this.idMount);
      }
    });
  }

  updateStages(idMount: number) {
    this.mountService.getMount(idMount).subscribe(mount => {
      this.mount = mount;
      this.stageMountService.mount = mount;
      this.stageMountService.resetStages();
      this.mount.stages.forEach((stage) => {
        this.stageMountService.putStage(stage);
      });

      if (this.stageMountService.stages.length !== 0) {
        this.stageMountService.stages.forEach((stage) => {
          if (stage.id === this.id) {
            this.stage = stage;
            this.showEditButtons = this.utils.showEditButtons(String(this.stageMountService.mount.user.id));
          }
        });
        if (typeof this.stage === 'undefined') {
          this.stage = new MountStage();
          this.isNothingToShow = true;
        }
      } else {
        this.stage = new MountStage();
        this.isNothingToShow = true;
      }
    });
  }

  statusColor(status) {
    return this.utils.statusStageMount(status).color;
  }

  statusIcon(status) {
    return this.utils.statusStageMount(status).image;
  }

}
