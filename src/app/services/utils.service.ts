import {Injectable} from '@angular/core';
import {OrderAction} from '../models/orders/order_action';

@Injectable()
export class UtilsService {

  timeFormat(autoDate: string) {
    let date;
    date = new Date(autoDate);
    return (date.getHours() + ':' + this.minutesStringFormat(date.getMinutes()));
  }

  dateFormat(autoDate: string) {
    let date;
    date = new Date(autoDate);
    return (date.getDate() + ' ' + date.getMonth() + ' ' + date.getFullYear() + ' '
      + date.getHours() + ':' + this.minutesStringFormat(date.getMinutes()));
  }

  minutesStringFormat(minutes: number) {
    let strMinutes: string;
    if (minutes < 10) {
      strMinutes = '0' + minutes.toString();
    }else {
      strMinutes = minutes.toString();
    }
    return strMinutes;
  }

  statusIcon(status: number) {
    let icon: string;
    switch (status) {
      case 0: {
        icon = 'mail_outline'
        break;
      }
      case 1: {
        icon = 'clear';
        break;
      }
      case 2: {
        icon = 'access_time';
        break;
      }
      case 3: {
        icon = 'check';
        break;
      }
      default: {
        icon = 'check_box_outline_blank';
        break;
      }
    }
    return icon;
  }

  orderActionDecoder (action: OrderAction) {
    let date = '';
    let user = action.user;
    let type = '';
    let essence = 'заявку';
    let causeStr = '';
    let cause = '';
    let commentStr = '';
    let comment = '';

    switch (action.type) {
      case 0: {
        type = 'создал(а)';
        break;
      }
      case 1: {
        type = 'отклонил(а)';
        break;
      }
      case 2: {
        type = 'временно отложил(а)';
        break;
      }
      case 3: {
        type = 'перенес(ла) в сделку';
        break;
      }
    }

    if (action.cause !== null) {
      causeStr = 'по причине:';
      switch (action.cause) {
        case 1: {
          cause = 'клиент не взял трубку';
          break;
        }
        case 2: {
          cause = 'другое';
          break;
        }
      }
    }

    if (action.comment !== null) {
      commentStr = ', с комментарием';
      comment = action.comment;
    }

    return date + '. ' + user + ', ' + type + ' ' + essence + ' ' + causeStr + ' ' + cause + commentStr + ' ' + comment;



  }



}
