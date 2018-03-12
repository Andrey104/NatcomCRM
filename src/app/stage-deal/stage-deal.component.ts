import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../services/utils.service';
import {MountStage} from '../models/mount/mount-stage';

@Component({
  selector: 'app-stage-deal',
  templateUrl: './stage-deal.component.html',
  styleUrls: ['./stage-deal.component.css']
})
export class StageDealComponent implements OnInit {
  @Input() stage: MountStage;


  constructor(private utils: UtilsService) {
  }

  ngOnInit() {
  }

  statusColor(status) {
    return this.utils.statusStageMount(status).color;
  }
  statusIcon(status) {
    return this.utils.statusStageMount(status).image;
  }

}
