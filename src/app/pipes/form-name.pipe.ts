import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formName'
})
export class FormNamePipe implements PipeTransform {

  transform(value: string): string {
    if (value === null || value === '') {
      value = 'Название формы отсутствует';
    }
    return value;
  }

}
