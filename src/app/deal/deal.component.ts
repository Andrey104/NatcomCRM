import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() deal;
  @Input() lastPage;

  isSelect = false;

  isActive() {
    return this.lastPage.isActive(this.deal);
  }

}
