import { Component, Injector } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ObrigacaoObrigacoesMesPagingService } from '../../services/pagings/obrigacaoObrigacoesMes.service';
import { ObrigacoesBase } from '../obrigacoes-base/obrigacoes-base';
import { ObrigacoesControl } from '../obrigacoes-control/obrigacoes-control';

@Component({
    selector: 'obrigacao-obrigacoes-table',
    standalone: true,
    imports: [InfiniteScrollDirective, ObrigacoesControl],
    templateUrl: './obrigacao-obrigacoes-table.html',
})
export class ObrigacaoObrigacoesTableComponent extends ObrigacoesBase {
    constructor(injector: Injector, obrigacaoObrigacoesMesPagingService: ObrigacaoObrigacoesMesPagingService) {
        super(injector, obrigacaoObrigacoesMesPagingService);
    }
}
