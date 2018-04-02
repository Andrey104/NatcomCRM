import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transferMountCause'
})
export class MountTransferCausePipe implements PipeTransform {
  transform(type: number): string {
    let cause: string;
    switch (type) {
      case 1: {
        cause = 'По инициативе клиента';
        break;
      }
      case 2: {
        cause = 'По инициативе компании';
        break;
      }
    }
    return cause;
  }
}
