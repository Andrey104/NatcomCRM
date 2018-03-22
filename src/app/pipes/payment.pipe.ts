import {Pipe, PipeTransform} from '@angular/core';
import {Payment} from '../models/payment';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {
  transform(payment: Payment): string {
    const user = payment.user.first_name + ' ' + payment.user.last_name;
    const sum = payment.sum;
    let comment = '';
    if (payment.comment !== null) {
      comment = ', с комментарием: ';
    }

    return user + ' добавил(а) ' + sum + 'р' + (payment.non_cash ? ' (безналичные)' : ' (наличные)') + ', получатель ' + payment.receiver + comment + ' дата получения - ';
  }

}
