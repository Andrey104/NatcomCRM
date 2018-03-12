import {Component, Input, OnInit} from '@angular/core';
import {MeasurementResult} from '../../models/measurement/measurement-result';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {
  @Input() measurement: MeasurementResult;

  constructor() { }

  ngOnInit() {
  }

}
