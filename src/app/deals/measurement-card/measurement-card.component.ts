import {Component, Input, OnInit} from '@angular/core';
import {DealMeasurement} from '../../models/deal/deal_measurement';


@Component({
  selector: 'app-measurement-card',
  templateUrl: './measurement-card.component.html',
  styleUrls: ['./measurement-card.component.css'],
})
export class MeasurementCardComponent implements OnInit {
  @Input() measurement: DealMeasurement;

  constructor() { }

  ngOnInit() {
  }

}
