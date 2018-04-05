import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imageType'
})
export class ImageTypePipe implements PipeTransform {
  transform(type: number): string {
    let url: string;
    switch (type) {
      case 1: {
        url = 'assets/images/worker.png';
        break;
      }
      case 2: {
        url = 'assets/images/avatar.png';
        break;
      }
      case 3: {
        url = 'assets/images/avatar.png';
        break;
      }
      case 4:
      case 5: {
        url = 'assets/images/admin.png';
        break;
      }
    }
    return url;
  }
}
