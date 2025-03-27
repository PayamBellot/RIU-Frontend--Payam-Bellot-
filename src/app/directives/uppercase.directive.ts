import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const newInput = input.value.toUpperCase();
    if (input.value !== newInput) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      input.value = newInput;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.setSelectionRange(start, end);
    }
  }
}
