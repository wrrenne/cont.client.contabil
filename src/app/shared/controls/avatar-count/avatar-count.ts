import { Component, Input } from '@angular/core';
import { AvatarTextComponent } from '../avatar-text/avatar-text';

@Component({
    selector: 'avatar-count',
    standalone: true,
    imports: [AvatarTextComponent],
    templateUrl: './avatar-count.html'
})
export class AvatarCountComponent {

    @Input() count: number
    @Input() bgColor: string = 'text-bg-silver'
    @Input() size?: string = '2.5rem'
    @Input() rounded: boolean = false
    @Input() circle: boolean = true

    constructor() { }

    getText() {
        return `+${this.count}`
    }
}
