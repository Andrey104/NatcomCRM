import {Component, Input, OnInit} from '@angular/core';
import {MountResult} from '../../models/mount/mount-result';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-mount',
  templateUrl: './mount.component.html',
  styleUrls: ['./mount.component.css']
})
export class MountComponent implements OnInit {
  @Input() mount: MountResult;

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
