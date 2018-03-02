import {Pipe, PipeTransform} from '@angular/core';
import {Payment} from '../models/payment';

@Pipe({
  name: 'payment'
})
export class PaymentPipe implements PipeTransform {
  transform(payment: Payment): string {
    const user = payment.user.first_name + ' ' + payment.user.last_name;
    const sum = payment.sum.substring(0, payment.sum.length - 3);
    let comment = '';
    if (payment.comment !== null) {
      comment = ', с комментарием: ';
    }
    return user + ' добавил(а) ' + sum + 'р, полачатель ' + payment.receiver + comment;
  }

}
