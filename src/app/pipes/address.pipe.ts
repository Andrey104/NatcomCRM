import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})

export class AddressPipe implements PipeTransform {
  transform(address: string): string {
    if (address === null || address === '') {
      address = 'Адрес отсутствует';
    }
    return address;
  }
}
