import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'info-stat',
    templateUrl: './info-stat.html',
    standalone: true,
    imports: [CommonModule]
})
export class InfoStatComponent {

    @Input() title: any
    @Input() value: any
    @Input() valueComplement?: any
    @Input() valueClass = 'text-2xl font-bold'
    @Input() icon?: string
}
