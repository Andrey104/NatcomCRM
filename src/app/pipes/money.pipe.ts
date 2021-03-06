import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  transform(money: string): string {
    if (money === null || money === '') {
      money = 'Сумма не указана';
    } else {
      money = money + ' р';
    }
    return money;
  }
}

