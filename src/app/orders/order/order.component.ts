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
  statusIcon(status: number) {
    return this.utils.statusOrder(status).image;
  }
  statusColor(status: number) {
    return this.utils.statusOrder(status).color;
  }
}
