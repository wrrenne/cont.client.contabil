import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'value-and-percentage',
    standalone: true,
    imports: [CommonModule, NgxTippyModule],
    templateUrl: './value-and-percentage.html',
})
export class ValueAndPercentageComponent {
    @Input() value: number;
    @Input() percentage: number;
}
