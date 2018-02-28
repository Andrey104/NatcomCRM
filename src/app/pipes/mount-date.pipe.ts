import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '../services/utils.service';

@Pipe({
  name: 'mountDate'
})
// Обработка даты монтажа
export class MountDatePipe implements PipeTransform {
  constructor(private utils: UtilsService) {}
  transform(date: string): string {
    if (date === null || date === '') {
      date = 'По телефону';
    } else {
      const mountDate = new Date(date);
      date = mountDate.getDate() + ' '
        + this.utils.monthStringFormat(mountDate.getMonth()) + '. ' + mountDate.getFullYear();
     }
    return date;
  }
}
