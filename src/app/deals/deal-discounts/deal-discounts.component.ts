import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DealService} from '../../services/deal.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-deal-discounts',
  templateUrl: './deal-discounts.component.html',
  styleUrls: ['./deal-discounts.component.css']
})
export class DealDiscountsComponent implements OnInit {
  @Input() deal;
  after;
  comment;
  id;
  @Output() close = new EventEmitter();
  constructor(private dealService: DealService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  addDiscount() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      this.dealService.dealDiscount(this.id, this.after, this.comment).subscribe(() => {
        this.close.emit();
      });
      }
    );
  }

}
