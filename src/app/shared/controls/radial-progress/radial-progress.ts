import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'radial-progress',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './radial-progress.html',
})
export class RadialProgressComponent {
    @Input() progress: number = 75; // value between 0 and 100
    @Input() label: string; // custom text shown below the chart
}
