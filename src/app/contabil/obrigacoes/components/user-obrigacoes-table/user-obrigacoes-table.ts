import { Component, Injector } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { UserObrigacoesMesPagingService } from '../../services/pagings/userObrigacoesMes.service';
import { ObrigacoesBase } from '../obrigacoes-base/obrigacoes-base';
import { ObrigacoesControl } from '../obrigacoes-control/obrigacoes-control';

@Component({
    selector: 'user-obrigacoes-table',
    standalone: true,
    imports: [InfiniteScrollDirective, ObrigacoesControl],
    templateUrl: './user-obrigacoes-table.html',
})
export class UserObrigacoesTableComponent extends ObrigacoesBase {
    constructor(injector: Injector, userObrigacoesMesPagingService: UserObrigacoesMesPagingService) {
        super(injector, userObrigacoesMesPagingService);
    }
}
