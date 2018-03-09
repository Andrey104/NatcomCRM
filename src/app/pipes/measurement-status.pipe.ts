import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'measurementStatus'
})
export class MeasurementStatusPipe implements PipeTransform {
  transform(status: number): string {
    let strStatus = '';
    switch (status) {
      case 0: {
        strStatus = 'Не распределен';
        break;
      }
      case 1: {
        strStatus = 'Ответственный назначен';
        break;
      }
      case 2: {
        strStatus = 'Закрыт (договор не заключен)';
        break;
      }
      case 3: {
        strStatus = 'Закрыт (договор заключен)';
        break;
      }
      case 4: {
        strStatus = 'Отказ';
        break;
      }
      case 5: {
        strStatus = 'В процессе отказа';
        break;
      }
    }
    return strStatus;
  }
}
