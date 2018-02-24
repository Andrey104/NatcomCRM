import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'nonCash'
})
// Проверка типа оплаты: Наличный/Безналичный
export class NonCashPipe implements PipeTransform{
  transform(paymentType: string): string {
    if (paymentType === 'true') {
      paymentType = 'Безналичный';
    } else {
      paymentType = 'Наличные';
    }
    return paymentType;
  }
}
