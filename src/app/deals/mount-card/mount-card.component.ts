import {Component, Inject, Input, OnInit} from '@angular/core';
import {DealMount} from '../../models/deal/deal_mount';
import {UtilsService} from '../../services/utils.service';
import {MeasurementService} from '../../services/measurement.service';
import {ActivatedRoute} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {MountService} from '../../services/mount.service';

@Component({
  selector: 'app-mount-card',
  templateUrl: './mount-card.component.html',
  styleUrls: ['./mount-card.component.css']
})
export class MountCardComponent implements OnInit {
  @Input() mount: DealMount;
  url: string;
  urlToMount: string;

  constructor(private utils: UtilsService,
              @Inject(DOCUMENT) private document: Document,
              private activatedRoute: ActivatedRoute,
              private measurementService: MeasurementService,
              private mountService: MountService) {
    this.url = this.document.location.href;
  }

  ngOnInit() {
    this.getUrl();
  }

  getUrl() {
    if (this.url.indexOf('mounts') !== -1) {
      // возможно поправить
      this.urlToMount = `/mounts/${this.mountService.statusMount}`;
      this.urlToMount += `/${this.mount.id.toString()}`;
    } else {
      this.urlToMount = `mount/${this.mount.id.toString()}`;
      console.log(this.urlToMount);
    }
  }

  statusColor(status) {
    return this.utils.statusMount(status).color;
  }

  statusIcon(status) {
    return this.utils.statusMount(status).image;
  }
}
