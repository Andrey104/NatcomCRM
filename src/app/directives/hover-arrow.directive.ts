import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHoverArrow]'
})
export class HoverArrowDirective {

  constructor(private element: ElementRef, private render: Renderer2) { }
  @HostListener('mouseenter') mouseEnter() {
    console.log(this.element);
    console.log(this.element.nativeElement.querySelector('i'));
    this.render.setStyle(this.element.nativeElement.querySelector('i'), 'font-size', '60px');
  }
}
