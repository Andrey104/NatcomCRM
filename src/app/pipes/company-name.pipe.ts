import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyName'
})
export class CompanyNamePipe implements PipeTransform {
  transform(company: string): string {
    if (company === null || company === '') {
      company = 'Компания не выбрана';
    }
    return company;
  }
}
