import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-order-to-deal',
  templateUrl: './order-to-deal.component.html',
  styleUrls: ['./order-to-deal.component.css']
})
export class OrderToDealComponent implements OnInit {
  @Input() openToDeal;
  @Output() close = new EventEmitter();
  @Input() order;
  id;
  comment;
  commentAddress;
  statusMeasure = false;
  iconStyle = 'add';
  constructor(private activatedRoute: ActivatedRoute) { }
  formToDeal = new FormGroup( {
    comment: new FormControl(''),
    commentAddress: new FormControl('')
    }
  );
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  onClose() {
    this.close.emit();
  }
  openMeasure() {
    this.statusMeasure = !this.statusMeasure;
    if (this.iconStyle === 'add') {
      this.iconStyle = 'remove';
    } else {
      this.iconStyle = 'add';
    }
  }
}
