import { Component, Input } from '@angular/core';
import { AvatarIconComponent } from '../avatar-icon/avatar-icon';

@Component({
    selector: 'button-icon',
    templateUrl: './button-icon.html',
    standalone: true,
    imports: [AvatarIconComponent],
})
export class ButtonIconComponent {
    @Input() icon: string;
    @Input() rounded = true;
    @Input() circle = false;
    @Input() tooltip?: string;
    @Input() size?: string = '2rem';
    @Input() bgColor = 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-700';
    @Input() iconColor = 'text-black/75 dark:text-white/75';
    @Input() iconClass = 'text-lg';
}
