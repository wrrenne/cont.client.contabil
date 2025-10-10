import { Component, Input } from '@angular/core';
import { WidgetDoneComponent } from 'src/app/shared/controls/widget-done/widget-done';

@Component({
    selector: 'cliente-solicitacoes-atendidas-widget',
    templateUrl: './cliente-solicitacoes-atendidas-widget.html',
    standalone: true,
    imports: [WidgetDoneComponent],
})
export class ClienteSolicitacoesAtendidasWidgetComponent {
    @Input() count: number;
}
