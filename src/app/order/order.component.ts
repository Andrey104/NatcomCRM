import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor() {
  }

  @Input() order;
  @Input() orderPage;

  isSelect = false;

  ngOnInit() {

  }

  isActive() {
    return this.orderPage.isActive(this.order);
  }

  timeFormat(autoDate: string) {
    let date;
    date = new Date(autoDate);
    return (date.getHours() +':'+ date.getMinutes())
  }


}
