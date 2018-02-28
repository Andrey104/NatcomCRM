import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DealService} from '../../services/deal.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-deal-comments',
  templateUrl: './deal-comments.component.html',
  styleUrls: ['./deal-comments.component.css']
})
export class DealCommentsComponent implements OnInit {
  @Input() deal;
  @Output() close = new EventEmitter();
  id;
  comment = '';
  constructor(private dealService: DealService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  addComment() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.dealService.dealComments(this.id, this.comment).subscribe(() =>
      this.close.emit()
    );
  }
}
