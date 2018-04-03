import {Pipe, PipeTransform} from '@angular/core';
import {Payment} from '../models/payment';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {
  transform(payment: Payment): string {
    const user = payment.user.first_name + ' ' + payment.user.last_name;
    const sum = payment.sum;
    let paymentType = '';
    let comment = '';
    if (payment.comment !== null) {
      comment = ', с комментарием: ';
    }
    switch (payment.payment_type) {
      case 1: {
        paymentType = ' (безналичные)';
        break;
      }
      case 2: {
        paymentType = ' (наличные)';
        break;
      }
      case 3: {
        paymentType = ' (терминал)';
        break;
      }
    }
    return user + ' добавил(а) ' + sum + 'р' + paymentType + ', получатель ' + payment.receiver + comment + ', дата получения - ';
  }

}
