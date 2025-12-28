import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'separator',
    standalone: true,
    imports: [NgClass],
    templateUrl: './separator.html',
})
export class SeparatorComponent {
    @Input() center = false;
}
