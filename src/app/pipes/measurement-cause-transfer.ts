import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transferMeasurementCause'
})
export class MeasurementTransferCausePipe implements PipeTransform {
  transform(type: number): string {
    let cause: string;
    switch (type) {
      case 1: {
        cause = 'Клиент';
        break;
      }
      case 2: {
        cause = 'Замерщик';
        break;
      }
    }
    return cause;
  }
}
