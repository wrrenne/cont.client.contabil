import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'label-text-info',
    standalone: true,
    imports: [NgIcon],
    templateUrl: './label-text-info.html'
})
export class LabelTextInfoComponent {
    @Input() label: string
    @Input() text?: string | number
    @Input() info?: string | number
    @Input() infoIcon?: string
    @Input() textClass?: string = ''
}
