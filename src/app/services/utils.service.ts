import {Injectable} from '@angular/core';
import {OrderAction} from '../models/orders/order_action';

@Injectable()
export class UtilsService {

  timeFormat(autoDate: string) {
    let date;
    date = new Date(autoDate);
    return (date.getHours() + ':' + this.minutesStringFormat(date.getMinutes()));
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
    let icon: {image, color};
    switch (status) {
      case 0: {
        icon = {image: 'mail_outline', color: 'untreated'};
        break;
      }
      case 1: {
        icon = {image: 'clear', color: 'renouncement'};
        break;
      }
      case 2: {
        icon = {image: 'access_time', color: 'deferred'};
        break;
      }
      case 3: {
        icon = {image: 'check', color: 'accepted'};
        break;
      }
      default: {
        icon = {image: 'check_box_outline_blank', color: 'others'};
        break;
      }
    }
    return icon;
  }

  statusDeal(status: number) {
    let ourStatus = '';
    switch (status) {
      case 0: {
        ourStatus = 'В обработке';
        break;
      }
      case 1: {
        ourStatus = 'В процессе замера';
        break;
      }
      case 2: {
        ourStatus = 'Контракт не заключен';
        break;
      }
      case 3: {
        ourStatus = 'Монтаж';
        break;
      }
      case 4: {
        ourStatus = 'Закрыта';
        break;
      }
      case 5: {
        ourStatus = 'Отменена';
        break;
      }
    }
    return ourStatus;
  }

  orderActionDecoder (action: OrderAction) {
    let date = action.auto_date;
    let user = action.user.first_name + ' ' + action.user.last_name;
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
      commentStr = ', с комментарием: ';
      comment = action.comment;
    }
    return ' ' + user + ', ' + type + ' ' + essence +
                ' ' + causeStr + ' ' + cause + commentStr + ' ' + comment;
  }

}
