import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'label-icon-2',
    templateUrl: './label-icon-2.html',
    standalone: true,
    imports: [CommonModule, NgIcon, NgxTippyModule],
})
export class LabelIcon2Component {
    @Input() label: any;
    @Input() icon: string;
    @Input() iconCss? = 'text-base';
    @Input() iconColorClass: string;
    @Input() labelCss? = '';
    @Input() tooltip?: string;
    @Input() tooltipPlacement: string;
    @Input() showArrow = false;
    @Input() iconAlignRight = false;
}
