import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {
  transform(email: string): string {
    if (email === null || email === '') {
      email = 'Email отсутствует';
    }
    return email;
  }
}
