import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'button-small-circle-icon',
    templateUrl: './button-small-circle-icon.html',
    standalone: true,
    imports: [CommonModule, NgIcon, NgxTippyModule],
})
export class ButtonSmallCircleIconComponent {
    @Input() icon: string;
    @Input() buttonCss = 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-black/75 dark:text-white/75 dark:hover:bg-neutral-700';
    @Input() iconOffsetX?: number;
    @Input() tooltip?: string;
    @Input() tooltipPlacement: string;

    private offsetClasses: { [key: number]: string } = {
        1: 'left-[1px]',
        2: 'left-[2px]',
        3: 'left-[3px]',
        4: 'left-[4px]',
    };

    get offsetClass(): string | null {
        return this.iconOffsetX !== undefined ? 'relative ' + this.offsetClasses[this.iconOffsetX] : null;
    }
}
