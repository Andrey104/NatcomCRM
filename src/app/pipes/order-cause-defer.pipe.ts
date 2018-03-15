import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'deferOrderCause'
})
export class OrderDeferCause implements PipeTransform {
  transform(type: number): string {
    let cause: string;
    switch (type) {
      case 1: {
        cause = 'Не берет трубку';
        break;
      }
      case 2: {
        cause = 'Слишком высокая цена';
        break;
      }
      case 3: {
        cause = 'Позвонить позже';
        break;
      }
    }
    return cause;
  }
}
