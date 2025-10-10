import { Component, Input } from '@angular/core';
import { WidgetDoneComponent } from 'src/app/shared/controls/widget-done/widget-done';

@Component({
    selector: 'cliente-arquivos-disponibilizados-widget',
    templateUrl: './cliente-arquivos-disponibilizados-widget.html',
    standalone: true,
    imports: [WidgetDoneComponent],
})
export class ClienteArquivosDisponibilizadosWidgetComponent {
    @Input() count: number;
}
