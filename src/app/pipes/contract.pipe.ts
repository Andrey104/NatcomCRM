import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'contract'
})
// Проверка статуса контракта
export class ContractPipe implements PipeTransform {
  transform(contract: boolean): string {
    let statusContract: string;
    if (contract === true) {
      statusContract = 'Заключен';
    } else {
      statusContract = 'Не заключен';
    }
    return statusContract;
  }

}
