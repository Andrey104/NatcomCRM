import {Component, OnInit, ViewChild} from '@angular/core';
import {MeasurementService} from '../../services/measurement.service';
import {MeasurementResult} from '../../models/measurement/measurement-result';
import {Subject} from 'rxjs/Subject';
import {inputPropChanged} from 'ngx-infinite-scroll/src/services/ngx-ins-utils';

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
  term$ = new Subject<string>();
  @ViewChild('input') input;

  constructor(private measurementService: MeasurementService) {
  }

  ngOnInit() {
    this.showMeasurements();
    this.subscribeOnInputField();
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

  subscribeOnInputField() {
    this.term$
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(
        (term) => {
          this.search(term);
        }
      );
  }

  onScrollMeasurement() {
    if (this.input.nativeElement.value === '') {
      this.nextPage();
    } else {
      this.nextFilterPage();
    }
  }

  search(text: string) {
    if (text !== '') {
      this.load = true;
      this.page = 1;
      this.measurementService.getFilterMeasurements(this.page, text)
        .subscribe((measurementPage) => {
            this.measurements = measurementPage.results;
            if (measurementPage.next === null) {
              this.lastPage = true;
            } else {
              this.lastPage = false;
            }
            this.load = false;
          }
        );
    } else {
      this.showMeasurements();
    }
  }

  nextPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.measurementService.getAllMeasurements(this.page)
        .subscribe((measurementPage) => {
          this.measurements = this.measurements.concat(measurementPage.results);
          if (measurementPage.next === null) {
            this.lastPage = true;
          }
          this.load = false;
        });
    }
  }

  nextFilterPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.measurementService.getFilterMeasurements(this.page, this.input.nativeElement.value)
        .subscribe((measurementPage) => {
          this.measurements = this.measurements.concat(measurementPage.results);
          if (measurementPage.next === null) {
            this.lastPage = true;
          } else {
            this.lastPage = false;
          }
          this.load = false;
        });
    }
  }
}
