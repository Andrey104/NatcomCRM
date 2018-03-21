import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {DealMeasurement} from '../../models/deal/deal_measurement';
import {ActivatedRoute} from '@angular/router';
import {MeasurementService} from '../../services/measurement.service';
import {Client} from '../../models/client';
import {Picture} from '../../models/picture';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-deal-measurement',
  templateUrl: './deal-measurement.component.html',
  styleUrls: ['./deal-measurement.component.css'],
})
export class DealMeasurementComponent implements OnInit, AfterViewChecked {
  measurement: DealMeasurement;
  id: number;
  clientInfo = false;
  showEditButtons = false;
  client: Client;
  flag = false;
  picture: Picture;
  loadPage: boolean;
  showMeasurementReject = false;
  showMeasurementTransfer = false;
  showMeasurementEdit = false;

  constructor(private activatedRoute: ActivatedRoute,
              private measurementService: MeasurementService, private utils: UtilsService) {
  }

  ngOnInit() {
    this.subscribeOnMeasurement();
  }

  ngAfterViewChecked(): void {
    if (this.flag === true) {
      document.getElementById('page').scrollTop = document.getElementById('page').scrollHeight;
      this.flag = false;
    }
  }

  successMeasurementUpdate() {
    this.loadPage = true;
    this.getMeasurementById();
  }

  subscribeOnMeasurement() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['measurement_id'];
      this.loadPage = true;
      this.getMeasurementById();
    });
  }

  getMeasurementById() {
    this.measurementService.getMeasurement(this.id)
      .subscribe((measurement) => {
        this.measurement = measurement;
        this.showEditButtons = this.utils.showEditButtons(String(this.measurement.deal_user.id));
        console.log(this.showEditButtons + ' фыаывфпаыфвп');
        this.loadPage = false;
      });
  }

  openClientInfo(idClient: number) {
    this.clientInfo = true;
    this.client = this.measurement.clients[idClient];
  }

  closeClientInfo() {
    this.clientInfo = false;
    this.client = null;
  }

  sendComment(comment: string) {
    this.measurementService.measurementComment(this.id, comment)
      .subscribe(next => {
        this.measurement.comments.push(next);
        this.flag = true;
      }, error => {
        console.log(error);
      });
  }

  openPicture(idPicture: number) {
    this.picture = this.measurement.pictures[idPicture];
  }

  closePicture() {
    this.picture = null;
  }
}
