import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';
import {DealMount} from '../../models/deal/deal_mount';

@Component({
  selector: 'app-mount',
  templateUrl: './mount.component.html',
  styleUrls: ['./mount.component.css']
})
export class MountComponent implements OnInit {
  @Input() mount: DealMount;

  constructor(private utils: UtilsService) {
  }

  ngOnInit() {
  }

  statusColor(status) {
    return this.utils.statusMount(status).color;
  }

  statusIcon(status) {
    return this.utils.statusMount(status).image;
  }

}
