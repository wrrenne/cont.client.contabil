import { Component, Input } from '@angular/core';
import { WidgetDoneComponent } from 'src/app/shared/controls/widget-done/widget-done';

@Component({
    selector: 'cliente-desde-widget',
    templateUrl: './cliente-desde-widget.html',
    standalone: true,
    imports: [WidgetDoneComponent],
})
export class ClienteDesdeWidgetComponent {
    @Input() data: string;
}
