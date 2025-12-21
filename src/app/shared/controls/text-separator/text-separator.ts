import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'text-separator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './text-separator.html',
    styleUrls: ['./text-separator.scss'],
})
export class TextSeparatorComponent {
    @Input() text: string;
    @Input() center = false;
    @Input() colorClass: string = 'text-black dark:text-white';
    @Input() borderClass: string = 'border-zinc-300 dark:border-zinc-600';
    @Input() uppercase = false;
    @Input() verticalSpace = true;
    @Input() showTextBorder = true;
}
