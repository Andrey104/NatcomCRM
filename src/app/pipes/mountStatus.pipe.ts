import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mountStatus'
})
export class MountStatusPipe implements PipeTransform {
  transform(status: number): string {
    let statusStr: string;
    switch (status) {
      case 0: {
        statusStr = 'Добавлен';
        break;
      }
      case 1: {
        statusStr = 'В процессе';
        break;
      }
      case 2: {
        statusStr = 'Успешно завершен';
        break;
      }
      case 3: {
        statusStr = 'Отклонен';
        break;
      }
    }
    return statusStr;
  }
}
