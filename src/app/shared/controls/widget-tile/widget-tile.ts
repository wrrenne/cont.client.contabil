import { Component, Input } from '@angular/core';


@Component({
    selector: 'widget-tile',
    standalone: true,
    imports: [],
    templateUrl: './widget-tile.html'
})
export class WidgetTileComponent {
    @Input() description?: string
    @Input() count?: number
    @Input() value?: number | string
    @Input() labelNone: string
    @Input() labelSingular: string
    @Input() labelPlural: string
    @Input() icon: string
    @Input() height?: string
}
