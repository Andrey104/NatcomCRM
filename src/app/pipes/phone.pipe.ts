import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhonePipe implements PipeTransform {
  transform(phone: string): string {
    if (phone !== null && phone !== '') {
      const value = phone;
      phone = '+7 (' + value.substring(0, 3) + ') ' + value.substring(3, 6) +
        '-' + value.substring(6, 8) + '-' + value.substring(8);
      return phone;
    } else {
      return phone;
    }
  }
}
