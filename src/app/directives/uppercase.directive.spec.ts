import { ElementRef } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  it('should create an instance', () => {
    const mockElementRef: ElementRef = new ElementRef(
      document.createElement('div')
    );
    const directive = new UppercaseDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
