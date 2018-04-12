import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formName'
})
export class FormNamePipe implements PipeTransform {

  transform(value: string): string {
    if (value === null || value === '') {
      value = 'Имя не указано';
    }
    return value;
  }

}
