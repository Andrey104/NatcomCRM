import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})

export class AddressPipe implements PipeTransform {
  transform(email: string): string {
    if (email === null || email === '') {
      email = 'Email отсутствует';
    }
    return email;
  }
}
