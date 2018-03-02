import {AfterContentChecked, Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appColorCompany]'
})
export class ColorCompanyDirective implements  AfterContentChecked {
  @Input('appColorCompany') symbol;
  @HostBinding('style.backgroundColor') background;
  @HostBinding('style.fontSize') font = '36px';

  constructor() {
  }

  ngAfterContentChecked(): void {
    switch (this.symbol) {
      case 'Б': {
        this.background = '#ffe400';
        break;
      }
      case 'МП': {
        this.background = 'green';
        this.font = '24px';
        break;
      }
      case 'Н': {
        this.background = 'blue';
      }
    }
  }

}
