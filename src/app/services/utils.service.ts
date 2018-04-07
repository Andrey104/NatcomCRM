import {Injectable} from '@angular/core';
import {OrderAction} from '../models/orders/order_action';
import {DealAction} from '../models/deal/deal_action';

@Injectable()
export class UtilsService {

  minutesStringFormat(minutes: number) {
    let strMinutes: string;
    if (minutes < 10) {
      strMinutes = '0' + minutes.toString();
    } else {
      strMinutes = minutes.toString();
    }
    return strMinutes;
  }

  hoursStringFormat(hour: number) {
    let strHour: string;
    if (hour < 10) {
      strHour = '0' + hour.toString();
    } else {
      strHour = hour.toString();
    }
    return strHour;
  }

  monthStringFormat(numberMonth: number) {
    const months = ['янв', 'фев', 'мрт', 'апр', 'мая', 'июн',
      'июл', 'авг', 'сен', 'окт', 'нбр', 'дек'];
    return months[numberMonth];
  }

  showEditButtons(id: string) {
    if (localStorage.getItem('id_manager') === id) {
      return true;
    }
    if (localStorage.getItem('user_type') === '4' ||
      localStorage.getItem('user_type') === '5') {
      return true;
    }
    return false;
  }

  statusOrder(status: number) {
    let icon: { image, color };
    switch (status) {
      case 0: {
        icon = {image: 'mail_outline', color: 'untreatedOrder'};
        break;
      }
      case 1: {
        icon = {image: 'clear', color: 'renouncementOrder'};
        break;
      }
      case 2: {
        icon = {image: 'access_time', color: 'deferredOrder'};
        break;
      }
      case 3: {
        icon = {image: 'check', color: 'acceptedOrder'};
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
        ourStatus = 'Перерасчет';
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

  statusMount(status: number) {
    let ourStatus: { image, color };
    switch (status) {
      case 0: {
        ourStatus = {image: 'autorenew', color: 'mountDuring'};
        break;
      }
      case 1: {
        ourStatus = {image: 'more_horiz', color: 'mountExpectation'};
        break;
      }
      case 2: {
        ourStatus = {image: 'check', color: 'mountSuccess'};
        break;
      }
      case 3: {
        ourStatus = {image: 'clear', color: 'mountRejected'};
        break;
      }
      default: {
        ourStatus = {image: 'check_box_outline_blank', color: 'others'};
      }
    }
    return ourStatus;
  }

  statusStageMount(status: number) {
    let ourStatus: { image, color };
    switch (status) {
      case 0: {
        ourStatus = {image: 'autorenew', color: 'stageDuring'};
        break;
      }
      case 1: {
        ourStatus = {image: 'check', color: 'stageSuccess'};
        break;
      }
    }
    return ourStatus;
  }

  orderActionDecoder(action: OrderAction) {
    let type = '';
    const essence = 'заявку';
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
        if (action.cause !== null) {
          causeStr = 'по причине: ';
          switch (action.cause) {
            case 1: {
              cause = 'нецелевая заявка';
              break;
            }
            case 2: {
              cause = 'договорился с конкурентами';
              break;
            }
          }
        }
        break;
      }
      case 2: {
        type = 'временно отложил(а)';
        if (action.cause !== null) {
          causeStr = 'по причине: ';
          switch (action.cause) {
            case 1: {
              cause = 'клиент не берет трубку';
              break;
            }
            case 2: {
              cause = 'слишком высокая цена';
              break;
            }
            case 3: {
              cause = 'позвонить позже';
              break;
            }
          }
        }
        break;
      }
      case 3: {
        type = 'перенес(ла) в сделку';
        break;
      }
      case 4: {
        type = 'перенес(ла) из отклоненных в текущие ';
        break;
      }
    }


    if (action.comment !== null) {
      commentStr = ', с комментарием: ';
      comment = action.comment;
    }
    return ', ' + type + ' ' + essence +
      ' ' + causeStr + ' ' + cause + commentStr + ' ' + comment;
  }

  dealActionDecoder(action: DealAction) {
    let type = '';
    let causeStr = '';
    let cause = '';
    let commentStr = '';
    let comment = '';

    switch (action.type) {
      case 0: {
        type = 'отказал(а) в сделке';
        if (action.cause !== null) {
          causeStr = 'по причине:';
          switch (action.cause) {
            case 1: {
              cause = ' заключились с конкурентами';
              break;
            }
            case 2: {
              cause = ' неадекватный клиент';
              break;
            }
            case 3: {
              cause = ' нет возможности монтажа';
              break;
            }
            case 4: {
              cause = ' ошибка сотрудника';
              break;
            }
          }
        }
        break;
      }
      case 1: {
        type = 'добавил(а) замер в сделку';
        break;
      }
      case 2: {
        type = 'добавил(а) монтаж в сделку';
        break;
      }
      case 3: {
        type = 'завершил(а) сделку';
        break;
      }
      case 4: {
        type = 'добавил(а) клиента';
        break;
      }
      case 5: {
        type = 'установил(а) менеджера';
        break;
      }
    }

    if (action.comment !== null) {
      commentStr = ', с комментарием: ';
      comment = action.comment;
    }
    return ', ' + type +
      ' ' + causeStr + ' ' + cause + commentStr + ' ' + comment;
  }

  stageActionDecoder(action: DealAction) {
    let message: string;
    let comment: string;
    let cause = '';
    switch (action.type) {
      case 1: {
        message = ' закрыл(а) стадию ';
        break;
      }

      case 2: {
        message = ' перенес(ла) стадию ';
        switch (action.cause) {
          case 1: {
            cause = 'по ошибке клиента ';
            break;
          }
          case 2: {
            cause = 'по ошибке монтажников ';
            break;
          }
        }
        break;
      }

      case 3: {
        message = ' добавил(а) затраты ';
        break;
      }

      case 4: {
        message = ' изменил(а) монтажников ';
        break;
      }
      default: {
        message = ' ';
        break;
      }
    }
    if (action.comment == null) {
      comment = '';
    } else {
      comment = 'с комментарием: \'' + action.comment + '\'';
    }
    return message + cause + comment;

  }

  statusUrlDeal(statusStr: string) {
    let status: { statusName: string, statusUrl: string };
    switch (statusStr) {
      case 'processing': {
        status = {statusName: 'Сделки в обработке', statusUrl: 'status=0'};
        break;
      }
      case 'measurement_assigned': {
        status = {statusName: 'В состоянии замера', statusUrl: 'status=1'};
        break;
      }
      case 'unconnected': {
        status = {statusName: 'Незаключенные сделки', statusUrl: 'status=2'};
        break;
      }
      case 'mount_assigned': {
        status = {statusName: 'В состоянии монтажа', statusUrl: 'status=3'};
        break;
      }
      case 'completed': {
        status = {statusName: 'Завершенные сделки', statusUrl: 'status=4'};
        break;
      }
      case 'canceled': {
        status = {statusName: 'Отклоненные сделки', statusUrl: 'status=5'};
        break;
      }
      case 'all': {
        status = {statusName: 'Все сделки', statusUrl: ''};
        break;
      }
    }
    return status;
  }

  statusUrlOrder(statusStr: string): any {
    let status: { statusName: string, statusUrl: string };
    switch (statusStr) {
      case 'processing': {
        status = {statusName: 'Заявки в процессе', statusUrl: 'status=0&status=2'};
        break;
      }
      case 'completed': {
        status = {statusName: 'Завершенные заявки', statusUrl: 'status=3'};
        break;
      }
      case 'canceled': {
        status = {statusName: 'Отмененные заявки', statusUrl: 'status=1'};
        break;
      }
      case 'all': {
        status = {statusName: 'Все заявки', statusUrl: ''};
      }
    }
    return status;
  }

  statusUrlMeasurement(statusStr: string) {
    let status: { statusName: string, statusUrl: string };
    switch (statusStr) {
      case 'undistributed': {
        status = {statusName: 'Нераспределенные замеры', statusUrl: 'status=0'};
        break;
      }
      case 'responsible': {
        status = {statusName: 'Распределенные замеры', statusUrl: 'status=1'};
        break;
      }
      case 'closed': {
        status = {statusName: 'Закрытые замеры', statusUrl: 'status=2&&status=3'};
        break;
      }
      case 'rejected': {
        status = {statusName: 'Отклоненные замеры', statusUrl: 'status=4&&status=5'};
        break;
      }
      case 'all': {
        status = {statusName: 'Все замеры', statusUrl: ''};
      }
    }
    return status;
  }

  statusUrlMount(statusStr: string) {
    let status: { statusName: string, statusUrl: string };
    switch (statusStr) {
      case 'processing': {
        status = {statusName: 'Монтажи в обработке', statusUrl: 'status=0'};
        break;
      }
      case 'added_stage': {
        status = {statusName: 'Монтажи в процессе', statusUrl: 'status=1'};
        break;
      }
      case 'completed': {
        status = {statusName: 'Завершенные монтажи', statusUrl: 'status=2'};
        break;
      }
      case 'canceled': {
        status = {statusName: 'Отклоненные', statusUrl: 'status=3'};
        break;
      }
      case 'all': {
        status = {statusName: 'Все монтажи', statusUrl: ''};
      }
    }
    return status;
  }

  measurementActionDecoder(action: DealAction) {
    let comment = '';
    let type = '';
    let cause = '';
    switch (action.type) {
      case 0: {
        type = ' завершил(а) замер ';
        break;
      }
      case 1: {
        type = ' перенес(ла) замер ';
        switch (action.cause) {
          case 1: {
            cause = 'по инициативе клиента';
            break;
          }
          case 2: {
            cause = 'по инициативе замерщика';
            break;
          }
        }
        break;
      }
      case 2: {
        type = ' отменил(а) замер ';
        switch (action.cause) {
          case 1: {
            cause = 'из-за ошибки менеджера';
            break;
          }
          case 2: {
            cause = 'из-за того, что клиент выбрал другую компанию';
            break;
          }
          case 3: {
            cause = 'из-за ошибки замерщика';
            break;
          }
        }
        break;
      }
      case 3: {
        type = ' стал(а) ответсвенным(ой) ';
        break;
      }
    }
    if (action.comment !== null) {
      comment = ', с комментарием: ' + action.comment;
    }
    return type + cause + comment;
  }

  measurementIconDecoder(status: number) {
    let measurement: { icon: string, color: string };
    switch (status) {
      case 0: {
        measurement = {icon: 'priority_high', color: 'undistributedMeasurement'};
        break;
      }
      case 1: {
        measurement = {icon: 'autorenew', color: 'responsibleAppointed'};
        break;
      }
      case 2: {
        measurement = {icon: 'check', color: 'closedNotConcluded'};
        break;
      }
      case 3: {
        measurement = {icon: 'check', color: 'closedContractConcluded'};
        break;
      }
      case 4: {
        measurement = {icon: 'clear', color: 'renouncement'};
        break;
      }
      case 5: {
        measurement = {icon: 'clear', color: 'processFailure'};
        break;
      }
    }
    return measurement;
  }

  mountActionDecoder(action: DealAction) {
    let comment = '';
    let type = '';
    let cause = '';
    switch (action.type) {
      case 1: {
        type = ' добавил(а) дату ';
        break;
      }
      case 2: {
        type = ' закрыл(а) монтаж(успешно) ';
        break;
      }
      case 3: {
        type = ' отказался(лась) от монтажа ';
        if (action.cause) {
          switch (action.cause) {
            case 1:
              cause = 'из-за ошибки клиента';
              break;
            case 2:
              cause = 'из-за ошибки монтажника';
              break;
          }
        }
        break;
      }
      case 4: {
        type = ' перенес(ла) монтаж ';
        if (action.cause) {
          switch (action.cause) {
            case 1:
              cause = 'по инициативе клиента ';
              break;
            case 2:
              cause = 'по инициативе компании ';
              break;
          }
        }
          break;
      }
      case 5: {
        type = ' добавил(а) сопутствующий расход ';
        break;
      }
      case 6: {
        type = ' добавил(а)/изменил(а) расход на комплектующие ';
        break;
      }
      case 7: {
        type = ' изменил(а) монтажников ';
        break;
      }
    }
    if (action.comment !== null) {
      comment = ', с комментарием: ' + action.comment;
    }

    return type + cause + comment;
  }

  getSearchParams(inputText: string, date: string): string {
    let params: string;
    if (inputText !== '' && date !== '') {
      params = `text=${inputText}&date=${date}`;
    } else if (inputText !== '') {
      params = `text=${inputText}`;
    } else if (date !== '') {
      params = `date=${date}`;
    }
    return params;
  }
}
