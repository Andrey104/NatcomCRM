import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rejectDealCause'
})
export class DealRejectCausePipe implements PipeTransform {
  transform(type: number): string {
    let cause: string;
    switch (type) {
      case 1: {
        cause = 'Заключили договор с конкурентами';
        break;
      }
      case 2: {
        cause = 'Неадекватный клиент';
        break;
      }
      case 3: {
        cause = 'Нет возможности произвести монтаж';
        break;
      }
      case 4: {
        cause = 'Ошибка сотрудника';
        break;
      }
    }
    return cause;
  }
}
