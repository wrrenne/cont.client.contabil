import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'label-text',
    templateUrl: './label-text.html',
    standalone: true,
    imports: [CommonModule]
})
export class LabelTextComponent {

    @Input() label: string
    @Input() text?: string | number | null
    @Input() minWidth?: number
    @Input() textClass?: string = 'text-black/50 dark:text-white/50'

    @ContentChild('textComplement') textComplement: TemplateRef<any>;
}
