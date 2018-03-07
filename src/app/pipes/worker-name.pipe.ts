import {Pipe, PipeTransform} from '@angular/core';
import {Worker} from '../models/worker';

@Pipe({
  name: 'workerName'
})
export class WorkerNamePipe implements PipeTransform {
  transform(worker: Worker): string {
    let workerStr = '';
    if (!worker) {
      workerStr = 'Нет ответсвенного';
    } else {
      workerStr = 'Ответственный ' +  worker.first_name + ' ' + worker.last_name;
    }
    return workerStr;
  }
}
