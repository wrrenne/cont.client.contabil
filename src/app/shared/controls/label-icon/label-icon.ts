import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'label-icon',
    standalone: true,
    imports: [CommonModule, NgIcon, NgxTippyModule],
    templateUrl: './label-icon.html',
})
export class LabelIconComponent {
    @Input() label: any;
    @Input() label2: any;

    private _descriptions: any[];
    @Input() get descriptions() {
        return this._descriptions;
    }
    set descriptions(value: any[]) {
        this._descriptions = value.filter((x) => x != undefined);
    }

    @Input() icon?: string;
    @Input() iconColorClass? = 'text-black/70 dark:text-white/70';
    @Input() iconTextClass = 'text-base';
    @Input() iconBgClass? = 'bg-zinc-200 dark:bg-zinc-700';
    @Input() labelClass? = '';
    @Input() label2Class? = 'text-black/40 dark:text-white/40';
    @Input() descriptionsClass? = 'text-xs text-black/40 dark:text-white/40';
    @Input() descriptionsHorizontal = true;
    @Input() tooltip?: string;
    @Input() tooltipPlacement: string;
    @Input() reverse = false;
    @Input() verticalCenter = true;
    @Input() rounded = false;
    @Input() circle = false;
    @Input() size = '2rem';
}
