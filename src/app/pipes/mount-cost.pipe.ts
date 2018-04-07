import {Pipe, PipeTransform} from '@angular/core';
import {Cost} from '../models/cost';

@Pipe({
  name: 'mountCost'
})
export class MountCostPipe implements PipeTransform {
  transform(cost: Cost): string {
    let destination: string;
    let comment = '';
    switch (cost.destination) {
      case 1: {
        destination = 'бензин';
        break;
      }
      case 2: {
        destination = 'заработную плату';
        break;
      }
      case 3: {
        destination = 'другое';
        break;
      }
    }
    if (cost.comment) {
      comment = ' с комментарием: ' + cost.comment;
    }
    return 'потрачено на ' + destination + comment;
  }
}
