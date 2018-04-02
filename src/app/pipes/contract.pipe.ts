import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'contract'
})
// Проверка статуса контракта
export class ContractPipe implements PipeTransform {
  transform(contract: boolean): string {
    let statusContract: string;
    if (contract === true) {
      statusContract = 'Договор заключен';
    } else {
      statusContract = 'Договор не заключен';
    }
    return statusContract;
  }

}
