import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { WidgetDoneComponent } from '../../../../shared/controls/widget-done/widget-done';

@Component({
    selector: 'clientes-count-widget',
    templateUrl: './clientes-count.html',
    standalone: true,
    imports: [WidgetDoneComponent],
})
export class ClientesCountWidgetComponent implements OnInit {
    count: number;

    constructor(private clientesService: ClientesService) {}

    ngOnInit(): void {
        this.clientesService.cadastroClientesCountGet().subscribe((x) => {
            this.count = 250;
            //this.count = x.obj;
        });
    }
}
