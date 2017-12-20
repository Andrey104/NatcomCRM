import {Directive, HostBinding, HostListener} from '@angular/core';
import {DealPageComponent} from '../deal-page/deal-page.component';


@Directive({
  selector: '[appPagination]'
})

export class PaginationDirective {


  @HostListener("scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('tt')
    }
  }
}
