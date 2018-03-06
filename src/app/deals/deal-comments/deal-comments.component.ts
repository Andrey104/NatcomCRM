import {Component, Input, OnInit} from '@angular/core';
import {OurComment} from '../../models/comment';


@Component({
  selector: 'app-deal-comments',
  templateUrl: './deal-comments.component.html',
  styleUrls: ['./deal-comments.component.css']
})
export class DealCommentsComponent implements OnInit {
  @Input() comment: OurComment;
  constructor() { }

  ngOnInit() {
  }

}
