import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {
  @Input() deal;

  constructor() { }

  ngOnInit() {
  }

}
