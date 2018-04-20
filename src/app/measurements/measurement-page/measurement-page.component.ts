import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeasurementService} from '../../services/measurement.service';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute} from '@angular/router';
import {UtilsService} from '../../services/utils.service';
import {WebsocketService} from '../../services/websocket.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-measurement-page',
  templateUrl: './measurement-page.component.html',
  styleUrls: ['./measurement-page.component.css']
})
export class MeasurementPageComponent implements OnInit, OnDestroy {
  measurements: DealMeasurement[];
  page: number;
  load: boolean;
  lastPage: boolean;
  status: { statusName: string, statusUrl: string };
  term$ = new Subject<string>();
  termDate$ = new Subject<string>();
  inputText = '';
  date = '';
  subOnWebSocket: Subscription;

  constructor(private measurementService: MeasurementService,
              private activatedRoute: ActivatedRoute,
              private utils: UtilsService,
              private webSocketService: WebsocketService) {
  }

  ngOnInit() {
    this.subscribeOnUrl();
    this.subscribeOnInputField();
    this.subscribeOnDateField();
    this.subOnWebSocket = this.webSocketService.message.subscribe((response) => {
      this.parseEvent(response);
    });
  }

  subscribeOnUrl() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.measurementService.measurementStatus = params['status'];
        this.inputText = '';
        this.date = '';
        this.status = this.utils.statusUrlMeasurement(params['status']);
        this.measurements = [];
        this.showMeasurements();
      });
  }

  subscribeOnInputField() {
    this.term$
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(
        (term) => {
          this.inputText = term;
          this.search();
        }
      );
  }

  subscribeOnDateField() {
    this.termDate$
      .subscribe(
        (term) => {
          this.date = term;
          this.search();
        }
      );
  }

  parseEvent(msg) {
    switch (msg.event) {
      case 'on_create_measurement': {
        this.measurementService.getMeasurement(msg.data.id)
          .subscribe((measurement: DealMeasurement) => {
            if (this.measurementService.measurementStatus === 'all' || this.measurementService.measurementStatus === 'undistributed') {
              this.measurements.unshift(measurement);
              this.measurements.pop();
            }
          });
        break;
      }
      case 'on_complete_measurement': {
        this.measurementService.getMeasurement(msg.data.id)
          .subscribe((measurement: DealMeasurement) => {
            if (this.measurementService.measurementStatus === 'closed') {
              this.measurements.unshift(measurement);
              this.measurements.pop();
            } else if (this.measurementService.measurementStatus === 'all' || this.measurementService.measurementStatus === 'responsible') {
              this.search();
            }
          });
        break;
      }
      case 'on_reject_measurement': {
        this.measurementService.getMeasurement(msg.data.id)
          .subscribe((measurement: DealMeasurement) => {
            if (this.measurementService.measurementStatus !== 'closed' && this.measurementService.measurementStatus !== 'rejected') {
              this.search();
            } else if (this.measurementService.measurementStatus === 'rejected') {
              this.measurements.unshift(measurement);
              this.measurements.pop();
            }
          });
        break;
      }
      case 'on_return_measurement': {
        this.measurementService.getMeasurement(msg.data.id)
          .subscribe((measurement: DealMeasurement) => {
            if (this.measurementService.measurementStatus === 'all' ||
              this.measurementService.measurementStatus === 'undistributed' ||
              this.measurementService.measurementStatus === 'fail_process' ||
              this.measurementService.measurementStatus === 'rejected'
            ) {
              this.search();
            }
          });
        break;
      }
      case 'on_transfer_measurement': {
        this.measurementService.getMeasurement(msg.data.id)
          .subscribe((measurement: DealMeasurement) => {
            if (this.measurementService.measurementStatus === 'all' || this.measurementService.measurementStatus === 'responsible') {
              this.search();
            }
          });
        break;
      }
      case 'on_take': {
        this.measurementService.getMeasurement(msg.data.id)
          .subscribe((measurement: DealMeasurement) => {
            if (this.measurementService.measurementStatus === 'all' || this.measurementService.measurementStatus === 'undistributed') {
              this.search();
            } else if (this.measurementService.measurementStatus === 'responsible') {
              this.measurements.unshift(measurement);
              this.measurements.pop();
            }
          });
        break;
      }
    }
  }

  showMeasurements() {
    this.page = 1;
    this.load = true;
    this.lastPage = false;
    this.measurementService.getAllMeasurements(this.page, this.status.statusUrl)
      .subscribe((measurementPage) => {
        this.measurements = measurementPage.results;
        if (measurementPage.next === null) {
          this.lastPage = true;
        }
        this.load = false;
        document.getElementById('scroll').scrollTop = 0;
      });
  }

  onScrollMeasurement() {
    if (this.inputText === '' && this.date === '') {
      this.nextPage();
    } else {
      this.nextFilterPage();
    }
  }

  search() {
    if ((this.date !== '' || this.inputText !== '') && this.measurements !== []) {
      this.measurements = [];
      this.load = true;
      this.page = 1;
      const params = this.utils.getSearchParams(this.inputText, this.date);
      this.measurementService.getFilterMeasurements(this.page, params)
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
      document.getElementById('scroll').scrollTop = 0;
    } else {
      this.measurements = [];
      this.showMeasurements();
    }
  }

  nextPage() {
    if (!this.lastPage && !this.load) {
      this.load = true;
      this.page = this.page + 1;
      this.measurementService.getAllMeasurements(this.page, this.status.statusUrl)
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
      const params = this.utils.getSearchParams(this.inputText, this.date);
      this.measurementService.getFilterMeasurements(this.page, params)
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

  ngOnDestroy() {
    if (this.subOnWebSocket) {
      this.subOnWebSocket.unsubscribe();
    }
  }
}
