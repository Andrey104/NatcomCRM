import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DealService} from '../../../services/deal.service';
import {NgForm} from '@angular/forms';
import {DealResult} from '../../../models/deal/deal_result';
import {Company} from '../../../models/company';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dialog-deal-edit',
  templateUrl: './deal-dialog-edit.html',
  styleUrls: ['./deal-dialog-edit.css'],
})
export class DealDialogEditComponent implements OnInit {
  id;
  @Input() closable = true;
  @Input() deal: DealResult;
  @Input() visible: boolean;
  @ViewChild('form') form: NgForm;
  @Output() successDealEdit = new EventEmitter();
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSubmitted = false;
  isRequest = false;
  companies: Company[] = [];
  formData = {};
  subOnCompanies: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private dealService: DealService) {
  }


  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.id = params['id'];
        this.subOnCompanies = this.dealService.getCompanies()
          .subscribe((companyPage) => {
            this.companies = companyPage.results;
          }, (err) => {
            console.log(err);
          }, () => {
            this.subOnCompanies.unsubscribe();
          });
      });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  submitForm() {
    const companyId = Number(this.form.form.value.company);
    this.isRequest = true;
    this.isSubmitted = true;
    this.formData = this.form.value;
    this.dealService.editDeal(this.id, companyId, this.form.form.value.address,
      this.form.form.value.address_comment, this.form.form.value.description)
      .subscribe((result) => {
        this.isRequest = false;
        this.visibleChange.emit(this.visible);
        this.successDealEdit.emit(result);
        this.close();
      }, (error) => {
        this.isRequest = false;
        alert('Произошла ошибка');
      });
  }

}


