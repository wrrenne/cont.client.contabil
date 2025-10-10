import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'label-ex',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './label-ex.html'
})
export class LabelExComponent {

    @ContentChild('infoContent') infoContent: TemplateRef<any>;

    @Input() label: string
    @Input() text: string
    @Input() info: string
    @Input() minWidth?: number
    @Input() bgClass = 'bg-neutral-200 dark:bg-neutral-800'
}
