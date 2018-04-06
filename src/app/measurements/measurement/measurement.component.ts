import {Component, Input, OnChanges} from '@angular/core';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnChanges {
  @Input() measurement: DealMeasurement;
  iconInfo: { icon: string, color: string };

  constructor(private utils: UtilsService) {
  }

  ngOnChanges(): void {
    this.iconInfo = this.utils.measurementIconDecoder(this.measurement.status);
  }

}
