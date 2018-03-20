import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';
import {MeasurementService} from '../../../services/measurement.service';

@Component({
  selector: 'app-dialog-add-manager',
  templateUrl: './deal-dialog-add-manager.html',
  styleUrls: ['./deal-dialog-add-manager.css'],
})

export class DealDialogManagerComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() deal;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successManagerAdd = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  formData = {};
  managers;

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getManagers();
  }

  getManagers() {
    this.dealService.getManagers().subscribe((result) => {
      this.managers = result.results;
      console.log(this.managers);
    });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submitForm() {
    this.isRequest = true;
    this.isSubmitted = true;
    this.formData = this.form.value;
    console.log(this.form.form.value.manager);
    this.dealService.setManager(this.id, this.form.form.value.manager)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successManagerAdd.emit();
        this.close();
      }, (error) => {
        this.isRequest = false;
        if (error.status === 200) {
          this.visibleChange.emit(this.visible);
          this.successManagerAdd.emit();
          this.close();
        } else {
          alert('Произошла ошибка');
        }
      });
  }
}


