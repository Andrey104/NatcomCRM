import {Pipe, PipeTransform} from '@angular/core';
import {Transfer} from '../models/transfer';

@Pipe({
  name: 'transfer'
})
export class TransferPipe implements PipeTransform {
  transform(transfer: Transfer, type: string): string {
    const user = transfer.user.first_name + ' ' + transfer.user.last_name;
    let commentType = '';
    let comment = '';
    let cause = 'по причине: НАДО СПРОСИТЬ У СЕРЕГИ';
    switch (type) {
      case 'measurement': {
        commentType = 'замер';
        break;
      }
      case 'mount': {
        break;
      }
    }
    if (transfer.comment !== null) {
      comment = ', c комментарием: ' + transfer.comment;
    }
    return user + ' перенес ' + commentType + ' c ' + transfer.old_date + ' на ' +
      transfer.new_date + ' ' + cause + comment;
  }
}
