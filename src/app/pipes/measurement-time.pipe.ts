import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'measurementTime'
})
export class MeasurementTimePipe implements PipeTransform {
  transform(time: string): string {
    if (time === null || time === '') {
      time = 'Комментарий по времени отсутствует';
    }
    return time;
  }

}
