import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private utils: UtilsService) {
  }

  @Input() order;

  ngOnInit() {
  }

  timeFormat(autoDate: string) {
    return this.utils.timeFormat(autoDate);
  }

  statusIcon(status: number) {
    return this.utils.statusIcon(status).image;
  }
  statusColor(status: number) {
    return this.utils.statusIcon(status).color;
  }




}
