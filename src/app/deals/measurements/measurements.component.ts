import { Component, OnInit } from '@angular/core';
import {MeasurementService} from '../../services/measurement.service';
import {ActivatedRoute} from '@angular/router';
import {DealMeasurement} from '../../models/deal/deal_measurement';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.css']
})
export class MeasurementsComponent implements OnInit {
  id: number;
  measuremts: DealMeasurement[];
  constructor(private measurementService: MeasurementService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeMeasurement();
  }
  subscribeMeasurement() {
     this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        this.measurementService.getMeasurements(this.id).subscribe( measuremts => {
            this.measuremts = measuremts;
          }
        );
     }
     );
  }

}
