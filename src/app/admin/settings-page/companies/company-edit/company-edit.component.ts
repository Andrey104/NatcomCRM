import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CompaniesService} from '../../../../services/companies.service';
import {Company} from '../../../../models/company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit, OnChanges {

  header = 'Добавить компанию';
  edit = false;
  nameInputActive = false;
  symbolInputActive = false;
  @Input() modalState;
  @Output() onClose = new EventEmitter<Boolean>(); // false - отмена, true - успешное выполнение


  constructor(private companyService: CompaniesService) {
  }

  companyForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.modalState.company != null) {
      this.header = 'Редактировать компанию';
      this.companyForm.setValue({name: this.modalState.company.name, symbol: this.modalState.company.symbol});
      this.formInputSetActive();
      this.edit = true;
    } else {
      this.header = 'Добавить компанию';
      this.companyForm.reset();
      this.formInputReset();
      this.edit = false;
    }
  }
  formInputSetActive() {
    this.nameInputActive = true;
    this.symbolInputActive = true;
  }
  formInputReset() {
    this.nameInputActive = false;
    this.symbolInputActive = false;
  }
  close(successfully: Boolean) {
    this.onClose.emit(successfully);
  }

  ok() {
    const name = this.companyForm.value.name;
    const phone = this.companyForm.value.symbol;
    const company = new Company();
    company.name = name;
    company.symbol = phone;
    if (this.edit) {
      company.id = this.modalState.company.id;
      this.companyService.editCompany(company).subscribe(data => {
        if (data) {
          alert('Компания изменена успешно!');
          this.close(true);
        } else {
          alert('Ошибка при изменении компании! Попробуйте снова!');
        }
      });
    } else {
      this.companyService.addCompany(company).subscribe(data => {
        if (data) {
          alert('Комапния добавлена успешно!');
          this.close(true);
        } else {
          alert('Ошибка при добавлении компании! Попробуйте снова!');
        }
      });
    }
  }

}
