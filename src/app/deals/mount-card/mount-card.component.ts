import {Component, Input, OnInit} from '@angular/core';
import {DealMount} from '../../models/deal/deal_mount';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-mount-card',
  templateUrl: './mount-card.component.html',
  styleUrls: ['./mount-card.component.css']
})
export class MountCardComponent implements OnInit {
  @Input() mount: DealMount;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
  }
  statusColor(status) {
    return this.utils.statusMount(status).color;
  }
  statusIcon(status) {
    return this.utils.statusMount(status).image;
  }
}
