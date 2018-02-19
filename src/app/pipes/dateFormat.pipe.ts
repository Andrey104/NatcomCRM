import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(date: string, full: boolean): string {
    let dateStr: string;
    const months = ['янв', 'Фев', 'мрт', 'апр', 'мая', 'июн',
      'июл', 'авг', 'сен', 'окт', 'нбр', 'дек'];
    const newDate = new Date(date);
    if (full === false) {
      dateStr = newDate.getDate() + ' ' + months[newDate.getMonth()] + '. ' + newDate.getFullYear();
    } else {
      dateStr = newDate.getDate() + ' ' + months[newDate.getMonth()] + '. ' + newDate.getFullYear() +
        ' в ' + newDate.getHours() + ':' + newDate.getMinutes();
    }
    return dateStr;
  }
}
