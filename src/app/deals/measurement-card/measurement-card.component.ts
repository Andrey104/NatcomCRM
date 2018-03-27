import {Component, Inject, Input, OnInit} from '@angular/core';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {UtilsService} from '../../services/utils.service';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MeasurementService} from '../../services/measurement.service';


@Component({
  selector: 'app-measurement-card',
  templateUrl: './measurement-card.component.html',
  styleUrls: ['./measurement-card.component.css'],
})
export class MeasurementCardComponent implements OnInit {
  @Input() measurement: DealMeasurement;
  measurementStatus: { icon: string, color: string };
  url: string;
  urlToMeasurement: string;

  constructor(private utils: UtilsService,
              @Inject(DOCUMENT) private document: Document,
              private activatedRoute: ActivatedRoute,
              private measurementService: MeasurementService) {
    this.url = this.document.location.href;
  }

  ngOnInit() {
    this.getUrl();
    this.getMeasurementStatus(this.measurement.status);
  }

  getUrl() {
    if (this.url.indexOf('measurements') !== -1) {
      // возможно поправить
      this.urlToMeasurement = `/measurements/${this.measurementService.measurementStatus}`;
      this.urlToMeasurement += `/${this.measurement.id.toString()}`;
    } else {
      this.urlToMeasurement = `measurement/${this.measurement.id.toString()}`;
    }
  }

  getMeasurementStatus(status) {
    this.measurementStatus = this.utils.measurementIconDecoder(status);
  }

}
