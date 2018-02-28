import {Component, Input, OnInit} from '@angular/core';
import {DealResult} from '../../models/deal/deal_result';


@Component({
  selector: 'app-object-stages',
  templateUrl: './object-stages.component.html',
  styleUrls: ['./object-stages.component.css']
})
export class ObjectStagesComponent implements OnInit {
  constructor() { }
  @Input() deal: DealResult;

  ngOnInit() {
  }

}
