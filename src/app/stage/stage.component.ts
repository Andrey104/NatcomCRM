import {Component, Input, OnInit} from '@angular/core';
import {Stage} from '../models/stage';
import {UtilsService} from '../services/utils.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
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
