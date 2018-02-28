import {Pipe, PipeTransform} from '@angular/core';
import {UtilsService} from '../services/utils.service';

@Pipe({
  name: 'action'
})
export class ActionPipe implements PipeTransform {
  constructor(private utils: UtilsService) {}

  transform(action, typeDecoder: string): string {
    let message = '';
    const user = action.user.first_name + ' ' + action.user.last_name;
    switch (typeDecoder) {
      case 'measurement': {
        message = user + this.utils.dealActionDecoder(action);
        break;
      }
    }
    return message;
  }
}
