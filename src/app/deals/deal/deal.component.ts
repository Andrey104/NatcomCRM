import { Component, Input, OnInit } from '@angular/core';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent implements OnInit {
  @Input() deal;

  constructor(private utils: UtilsService) { }

  ngOnInit() {
  }
  statusDeal(status) {
    return this.utils.statusDeal(status);
  }
}
