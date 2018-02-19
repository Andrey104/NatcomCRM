import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientName'
  })
export class ClientNamePipe implements PipeTransform {
  transform(value: string): string {
    if (value === null || value === '') {
      value = 'Имя не указано';
    }
    return value;
  }
}
