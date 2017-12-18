import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() order;
  @Input() orderPage;



  activeOrderNotNull(){
    return this.orderPage.activeOrderNotNull();
  }

  // ф-ции для кнопок--------------
  reject(){
    alert('reject')
  }

  defer(){
    alert('defer')
  }

  in_a_deal(){
    alert('in a deal')
  }

  //-------------------------------

}
