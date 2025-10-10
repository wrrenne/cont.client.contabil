import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'tagged',
    templateUrl: './tagged.html'
})
export class TaggedComponent {

    @Input() text?: string | number = '1';
    @Input() color?: string = 'white-black';
    @Input() rounded = true

    @HostBinding('class') get classGet() {
        return `tag tag-${this.color} { this.rounded ? '!rounded-full' : ''}`
    }
}
