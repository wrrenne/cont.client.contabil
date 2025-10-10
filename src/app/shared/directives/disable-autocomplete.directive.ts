import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[disableautocomplete]'
})
export class DisableAutocompleteDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {
        if (this.el.nativeElement.tagName === 'INPUT') {
            this.renderer.setAttribute(this.el.nativeElement, 'autocomplete', 'off');
        }
    }
}
