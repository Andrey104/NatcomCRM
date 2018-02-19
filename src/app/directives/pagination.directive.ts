import {Directive, HostBinding, HostListener} from '@angular/core';
import {DealPageComponent} from '../deals/deal-page/deal-page.component';


@Directive({
  selector: '[appPagination]'
})

export class PaginationDirective {


  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('tt');
      // you're at the bottom of the page
    }
      // you're at the bottom of the page


  }
}
