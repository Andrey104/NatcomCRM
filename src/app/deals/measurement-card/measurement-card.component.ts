import {Component, Input, OnInit} from '@angular/core';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {UtilsService} from '../../services/utils.service';


@Component({
  selector: 'app-measurement-card',
  templateUrl: './measurement-card.component.html',
  styleUrls: ['./measurement-card.component.css'],
})
export class MeasurementCardComponent implements OnInit {
  @Input() measurement: DealMeasurement;
  measurementStatus: { icon: string, color: string };

  constructor(private utils: UtilsService) {
  }

  ngOnInit() {
    this.getMeasurementStatus(this.measurement.status);
  }

  getMeasurementStatus(status) {
    this.measurementStatus = this.utils.measurementIconDecoder(status);
  }

}
