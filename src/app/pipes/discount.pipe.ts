import {Pipe, PipeTransform} from '@angular/core';
import {DealDiscount} from '../models/deal/deal_discount';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {
  transform(discount: DealDiscount): string {
    const user = discount.user.first_name + ' ' + discount.user.last_name;
    let comment = '';
    if (discount.comment !== null) {
      comment = ' c комментарием: ' + discount.comment;
    }
    return user + ' произвел(а) перерасчет с ' + discount.before + ' на ' + discount.after + comment;
  }
}
