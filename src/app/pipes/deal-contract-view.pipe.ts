import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dealContractView'
})
export class DealContractView implements PipeTransform {
  transform(value: string): string {
    while (String(value).length < 5) {
      value = '0' + value;
    }
    return value;
  }
}
