import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rejectOrderCause'
})
// Проверка типа оплаты: Наличный/Безналичный
export class OrderRejectCause implements PipeTransform {
  transform(type: number): string {
    let cause: string;
    switch (type) {
      case 1: {
        cause = 'Нецелевая заявка';
        break;
      }
      case 2: {
        cause = 'Договорился с конкурентами';
        break;
      }
    }
    return cause;
  }
}
