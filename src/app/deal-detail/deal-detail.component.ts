import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deal-detail',
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.css']
})
export class DealDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() deal;
  @Input() dealPage;

  activeDealNotNull(){
    return this.dealPage.activeDealNotNull();
  }

}
