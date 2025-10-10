import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'avatar-text',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './avatar-text.html',
})
export class AvatarTextComponent {
    @Input() rounded = true;
    @Input() circle = false;
    @Input() text: string | number;
    @Input() subText?: string | number;
    @Input() fontSize?: string;
    @Input() bold: boolean;
    @Input() bgColor: string = 'bg-avatar';
    @Input() textColorClass: string = '';
    @Input() size?: string = '3.5rem';
    @Input() badge: 'check' | 'warning' | 'custom' | 'none' = 'none';
    @Input() badgeSize = 18;
    @Input() badgeCustom?: string;
    @Input() badgeCustomClass?: string;

    constructor() {}
}
