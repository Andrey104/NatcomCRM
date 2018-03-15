import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MeasurementResult} from '../../models/measurement/measurement-result';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnChanges {
  @Input() measurement: MeasurementResult;
  iconInfo: { icon: string, color: string };

  constructor(private utils: UtilsService) {
  }

  ngOnChanges(): void {
    this.iconInfo = this.utils.measurementIconDecoder(this.measurement.status);
  }

}
