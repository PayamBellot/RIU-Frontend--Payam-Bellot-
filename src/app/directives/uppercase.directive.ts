import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective {
  private el = inject(ElementRef);

  constructor() {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    input.value = value.charAt(0).toUpperCase() + value.slice(1);
  }
}
