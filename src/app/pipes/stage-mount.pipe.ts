import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stageStatus'
})
export class StageMountStatusPipe implements PipeTransform {
  transform(status: number): string {
    let statusStr: string;
    switch (status) {
      case 0: {
        statusStr = 'В процессе';
        break;
      }
      case 1: {
        statusStr = 'Стадия закрыта';
        break;
      }
    }
    return statusStr;
  }
}
