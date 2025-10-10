import { Directive, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
    selector: '[disableIf]',
    standalone: true
})
export class DisableIfDirective {
    private _condition: boolean = false;

    @Input()
    set disableIf(value: boolean) {
        this._condition = value;
        this.updateDisabledState();
    }

    get disableIf(): boolean {
        return this._condition;
    }

    @Input() applyOpacity: boolean = true;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    private updateDisabledState(): void {
        if (this._condition) {
            this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
            if (this.applyOpacity) {
                this.renderer.addClass(this.el.nativeElement, 'opacity-30');
            }
            this.renderer.addClass(this.el.nativeElement, 'cursor-not-allowed');
        } else {
            this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
            this.renderer.removeClass(this.el.nativeElement, 'opacity-30');
            this.renderer.removeClass(this.el.nativeElement, 'cursor-not-allowed');
        }
    }
}



//import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';

//@Directive({
//    selector: '[disableIf]'
//})
//export class DisableIfDirective implements OnInit {
//    @Input('disableIf') condition: boolean = false;
//    @Input('applyOpacity') applyOpacity: boolean = true;

//    constructor(private el: ElementRef, private renderer: Renderer2) { }

//    ngOnInit() {
//        if (this.condition) {
//            this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
//            if (this.applyOpacity) this.renderer.addClass(this.el.nativeElement, 'opacity-30');
//            this.renderer.addClass(this.el.nativeElement, 'cursor-not-allowed');
//        }
//    }
//}
