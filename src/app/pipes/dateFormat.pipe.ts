import { Pipe, PipeTransform } from '@angular/core';
import {UtilsService} from '../services/utils.service';

@Pipe({
  name: 'dateFormat'
})
// Формат полной/неполной даты и времени
export class DateFormatPipe implements PipeTransform {
  constructor(private utils: UtilsService) {}
  transform(date: string, dateType: string): string {
    let dateStr: string;
    const newDate = new Date(date);
    switch (dateType) {
      case 'date': {
        dateStr = newDate.getDate() + ' ' + this.utils.monthStringFormat(newDate.getMonth()) +
        '. ' + newDate.getFullYear();
        break;
      }
      case 'fullDate': {
        dateStr = newDate.getDate() + ' ' + this.utils.monthStringFormat(newDate.getMonth()) +
          '. ' + newDate.getFullYear() + ' в ' + newDate.getHours() + ':' +
          this.utils.minutesStringFormat(newDate.getMinutes());
        break;
      }
      case 'time': {
        dateStr = this.utils.hoursStringFormat(newDate.getHours()) + ':' +
          this.utils.minutesStringFormat(newDate.getMinutes());
        break;
      }
    }
    return dateStr;
  }
}
