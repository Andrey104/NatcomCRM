import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'actionStage'
})
export class ActionStagePipe implements PipeTransform {

  transform(action, typeDecoder: string): string {
    let message = 'asd';
    console.log(action);
    const user = action.user.first_name + ' ' + action.user.last_name;
    return message;
  }
}
