import { Component, OnInit } from '@angular/core';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {ActivatedRoute} from '@angular/router';
import {MeasurementService} from '../../services/measurement.service';

@Component({
  selector: 'app-deal-measurement',
  templateUrl: './deal-measurement.component.html',
  styleUrls: ['./deal-measurement.component.css'],
})
export class DealMeasurementComponent implements OnInit {
  measurement: DealMeasurement;
  id: number;
  constructor(private activatedRoute: ActivatedRoute, private measurementService: MeasurementService) {
  }
  ngOnInit() {
    this.subscribeOnMeasurement();
  }
  subscribeOnMeasurement() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['measurement_id'];
      this.measurementService.getMeasurement(this.id).subscribe(measurement => {
        this.measurement = measurement;
      });
    });
  }

}
