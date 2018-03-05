import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mountStatus'
})
export class MountStatusPipe implements PipeTransform {
  transform(status: number): string {
    let statusStr: string;
    console.log(status);
    switch (status) {
      case 0: {
        statusStr = 'В процессе';
        break;
      }
      case 1: {
        statusStr = 'Добавлена стадия';
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
