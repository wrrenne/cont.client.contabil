import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HtmlUtilsService } from '../../services/htmlUtils.service';

@Directive({
    selector: '[cardBorder]'
})
export class CardBorderComponent implements OnInit {

    constructor(private el: ElementRef, private renderer: Renderer2, private htmlUtilsService: HtmlUtilsService) {
    }

    ngOnInit(): void {
        this.renderer.addClass(this.el.nativeElement, 'border-l-8');
        this.renderer.addClass(this.el.nativeElement, 'py-3');

        const classes = this.getBorderColor().split(' ');
        classes.forEach(cls => this.renderer.addClass(this.el.nativeElement, cls));

        this.renderer.addClass(this.el.nativeElement, 'pl-3'); 
    }

    getBorderColor(cor?: string): string {
        return this.htmlUtilsService.getBorderColor(cor)
    }
}
