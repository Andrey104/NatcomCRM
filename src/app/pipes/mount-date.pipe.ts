import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mountDate'
})

export class MountDatePipe implements PipeTransform {
  transform(date: string): string {
    if (date === null || date === '') {
      date = 'По телефону';
    } else {
      const months = ['янв', 'Фев', 'мрт', 'апр', 'мая', 'июн',
        'июл', 'авг', 'сен', 'окт', 'нбр', 'дек'];
      const mountDate = new Date(date);
      date = mountDate.getDate() + ' ' + months[mountDate.getMonth()] + ' ' + mountDate.getFullYear();
     }
    return date;
  }
}
