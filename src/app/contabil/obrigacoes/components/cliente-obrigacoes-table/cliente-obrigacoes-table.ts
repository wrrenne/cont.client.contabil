import { Component, Injector } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ClienteObrigacoesMesPagingService } from '../../services/pagings/clienteObrigacoesMes.service';
import { ObrigacoesBase } from '../obrigacoes-base/obrigacoes-base';
import { ObrigacoesControl } from '../obrigacoes-control/obrigacoes-control';

@Component({
    selector: 'cliente-obrigacoes-table',
    standalone: true,
    imports: [InfiniteScrollDirective, ObrigacoesControl],
    templateUrl: './cliente-obrigacoes-table.html',
})
export class ClienteObrigacoesTableComponent extends ObrigacoesBase {
    constructor(injector: Injector, espelhosService: ClienteObrigacoesMesPagingService) {
        super(injector, espelhosService);
    }

    obrigacaoClienteUpdate(e: any) {
        this.onObrigacaoUpdate.emit(e);
    }
}
