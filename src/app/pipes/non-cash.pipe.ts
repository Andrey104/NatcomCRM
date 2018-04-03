import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'nonCash'
})
// Проверка типа оплаты: Наличный/Безналичный
export class NonCashPipe implements PipeTransform {
  transform(type: number): string {
    let paymentType: string;
    switch (type) {
      case 1: {
        paymentType = 'Безналичный';
        break;
      }
      case 2: {
        paymentType = 'Наличный';
        break;
      }
      case 3: {
        paymentType = 'Терминал';
        break;
      }
      default: {
        paymentType = 'Способ оплаты отсутствует';
      }
    }
    return paymentType;
  }
}
