import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomDateTimePipe } from '../../pipes/customDateTime.pipe';
import { RelativeTimePipe } from '../../pipes/relativeTime.pipe';

@Component({
    selector: 'acesso-text',
    standalone: true,
    imports: [CommonModule, CustomDateTimePipe, RelativeTimePipe],
    templateUrl: './acesso-text.html',
})
export class AcessoTextComponent {
    @Input() acesso?: Date;
}
