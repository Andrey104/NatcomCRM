import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rejectMeasurementCause'
})
export class MeasurementRejectCausePipe implements PipeTransform {
  transform(type: number): string {
    let cause: string;
    switch (type) {
      case 1: {
        cause = 'Выбрали другую компанию';
        break;
      }
      case 2: {
        cause = 'Ошибка замерщика';
        break;
      }
      case 3: {
        cause = 'Ошибка менеджера';
        break;
      }
    }
    return cause;
  }
}
