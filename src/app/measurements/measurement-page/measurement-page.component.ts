import {Component, OnInit} from '@angular/core';
import {MeasurementService} from '../../services/measurement.service';
import {MeasurementResult} from '../../models/measurement/measurement-result';

@Component({
  selector: 'app-measurement-page',
  templateUrl: './measurement-page.component.html',
  styleUrls: ['./measurement-page.component.css']
})
export class MeasurementPageComponent implements OnInit {
  measurements: MeasurementResult[];
  page: number;
  load: boolean;
  lastPage: boolean;

  constructor(private measurementService: MeasurementService) {
  }

  ngOnInit() {
    this.showMeasurements();
  }

  showMeasurements() {
    this.page = 1;
    this.load = true;
    this.lastPage = false;
    this.measurementService.getAllMeasurements(this.page)
      .subscribe((measurementPage) => {
        this.measurements = measurementPage.results;
        if (measurementPage.next === null) {
          this.lastPage = true;
        }
        this.load = false;
      });
  }
}
