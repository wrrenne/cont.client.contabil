import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'button-default',
    templateUrl: './button-default.html',
    standalone: true,
    imports: [CommonModule, NgIcon],
})
export class ButtonDefaultComponent {
    @Input() icon?: string;
    @Input() text?: string;
    @Input() bgClass?: string;
    @Input() showArrow = false;
    @Input() disabled = false;
    @Input() size: 'xs' | 'md' | 'lg' = 'md';
}
