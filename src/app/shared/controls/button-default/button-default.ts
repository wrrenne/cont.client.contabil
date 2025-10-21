import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'button-default',
    templateUrl: './button-default.html',
    standalone: true,
    imports: [CommonModule, NgIcon, NgxTippyModule],
})
export class ButtonDefaultComponent {
    tippyProps: any = { placement: 'top' };

    @Input() icon?: string;
    @Input() text?: string;
    @Input() bgClass?: string;
    @Input() showArrow = false;
    @Input() disabled = false;
    @Input() rounded = false;
    @Input() circle = false;
    @Input() border = true;
    @Input() size: 'xs' | 'md' | 'lg' = 'md';
    @Input() tooltip?: string;
}
