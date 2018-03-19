import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StageMountService} from '../services/stage-mount.service';
import {MountStage} from '../models/mount/mount-stage';
import {DealMount} from '../models/deal/deal_mount';
import {MountService} from '../services/mount.service';
import {UtilsService} from '../services/utils.service';
import {Cost} from '../models/cost';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  id: number;
  idMount: number;
  stage: MountStage;
  mount: DealMount;
  isNothingToShow = false;
  showCompleteStage = false;
  showTransferStage = false;
  showAddCost = false;
  showAddInstaller = false;

  constructor(private activatedRoute: ActivatedRoute, private stageMountService: StageMountService, private mountService: MountService,
              private utils: UtilsService) {
  }

  ngOnInit() {
    console.log(typeof this.stage);
    this.getStage();
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
    this.stage.costs.push(cost);
  }

  getStage() {
    this.activatedRoute.params.subscribe(params => {
      this.id = Number(params['stage_id']);
      if (this.stageMountService.stages.length !== 0) {
        this.stageMountService.stages.forEach((stage) => {
          if (stage.id === this.id) {
            this.stage = stage;
          }
        });
      } else {
        //если решили обновить страницу - запросим заново монтаж и закинем его стадии в сервис стадий
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
      this.stageMountService.resetStages();
      this.mount.stages.forEach((stage) => {
        this.stageMountService.putStage(stage);
      });

      if (this.stageMountService.stages.length !== 0) {
        this.stageMountService.stages.forEach((stage) => {
          if (stage.id === this.id) {
            this.stage = stage;
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
