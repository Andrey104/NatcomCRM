import {Injectable} from '@angular/core';
import {MountStage} from '../models/mount/mount-stage';
import {MountService} from './mount.service';

@Injectable()
export class StageMountService {
  stages: MountStage[] = [];

  constructor(private mountService: MountService) {
  }

  putStage(stage: MountStage) {
    this.stages.push(stage);
  }


  resetStages() {
    this.stages = [];
  }


}
