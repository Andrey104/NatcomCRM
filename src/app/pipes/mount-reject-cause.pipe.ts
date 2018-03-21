import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rejectMountCause'
})
export class MountRejectCausePipe implements PipeTransform {
  transform(type: number): string {
    let cause: string;
    switch (type) {
      case 1: {
        cause = 'Ошибка клиента';
        break;
      }
      case 2: {
        cause = 'Ошибка монтажника';
        break;
      }
    }
    return cause;
  }
}
