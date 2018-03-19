import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';

@Component({
  selector: 'app-deal-complete',
  templateUrl: './deal-dialog-complete.component.html',
  styleUrls: ['./deal-dialog-complete.component.css'],
})
export class DealDialogCompleteComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() deal;
  @Input() visible: boolean;
  @Output() successDeal = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submitForm() {
    this.isRequest = true;
    this.isSubmitted = true;
    this.dealService.dealComplete(this.id).subscribe((result) => {
      this.isRequest = false;
      this.visibleChange.emit(this.visible);
      this.successDeal.emit();
      this.close();
    }, (error) => {
      this.isRequest = false;
      if (error.status === 200) {
        this.visibleChange.emit(this.visible);
        this.successDeal.emit();
        this.close();
      } else {
        alert('Произошла ошибка');
      }
    });
  }

}
