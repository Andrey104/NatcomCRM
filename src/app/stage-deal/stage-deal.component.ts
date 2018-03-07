import {Component, Input, OnInit} from '@angular/core';
import {Stage} from '../models/stage';
import {UtilsService} from '../services/utils.service';

@Component({
  selector: 'app-stage-deal',
  templateUrl: './stage-deal.component.html',
  styleUrls: ['./stage-deal.component.css']
})
export class StageDealComponent implements OnInit {
  @Input() stage: Stage;


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
