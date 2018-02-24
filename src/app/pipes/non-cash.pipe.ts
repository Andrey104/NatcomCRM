import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'nonCash'
})
// Проверка типа оплаты: Наличный/Безналичный
export class NonCashPipe implements PipeTransform {
  transform(type: boolean): string {
    let paymentType: string;
    if (type === true) {
      paymentType = 'Безналичный';
    } else {
      paymentType = 'Наличные';
    }
    return paymentType;
  }
}
