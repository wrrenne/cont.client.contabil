import { Component, Input } from '@angular/core';
import { StringsService } from '../../services';
import { NgIcon } from '@ng-icons/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'label-count',
    templateUrl: './label-count.html',
    standalone: true,
    imports: [CommonModule, NgIcon, NgxTippyModule]
})
export class LabelCountComponent {
    @Input() icon: string
    @Input() count?: number
    @Input() labelNone?: string
    @Input() labelSingular?: string
    @Input() labelPlural?: string
    @Input() tooltip?: string
    @Input() tooltipPlacement: string
    @Input() showBackground = true
    @Input() size: 'normal' | 'big' = 'normal'

    constructor(private stringsService: StringsService) {

    }

    getLabel(): string {
        if (this.count != undefined && this.labelNone && this.labelSingular && this.labelPlural) {
            return this.stringsService.getSingularPlural(this.count!, this.labelNone!, this.labelSingular!, this.labelPlural!)
        }
        else {
            return ''
        }
    }
}
