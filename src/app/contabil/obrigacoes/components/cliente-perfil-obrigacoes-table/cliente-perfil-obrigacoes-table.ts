import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { NoDataPanelComponent } from 'src/app/shared/controls/no-data-panel/no-data-panel';
import { PagingBase } from '../../../../shared/models';
import { SearchService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClientePerfilObrigacaoPageItem } from '../../../models/obrigacoes/pagings';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesUtilsService } from '../../services/obrigacoesUtils.service';
import { ClientePerfilObrigacoesPagingService } from '../../services/pagings/perfil-cliente-obrigacoes.service';

@Component({
    selector: 'cliente-perfil-obrigacoes-table',
    templateUrl: './cliente-perfil-obrigacoes-table.html',
    imports: [InfiniteScrollDirective, AvatarTitleComponent, NoDataPanelComponent, NzSkeletonComponent],
})
export class ClientePerfilObrigacoesTableComponent extends PagingBase<ClientePerfilObrigacaoPageItem> implements OnInit {
    public _parameters?: ObrigacoesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        if (value == null) return;

        this._parameters = value;
        this.param.routeStrings = [];
        this.param.routeStrings.push(value.clienteId!.toString());
        this.param.routeStrings.push(value.perfilItemId!.toString());
        this.param.routeStrings.push(this.dateUtilsService.firstDateOfCurrentMonthIso());

        this.param.queryStrings.clear();

        if (value.tipo) this.param.queryStrings.set('tipo', value.tipo);

        if (value.departamentoId) this.param.queryStrings.set('departamentoId', value.departamentoId);

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        clientePerfilObrigacoesPagingService: ClientePerfilObrigacoesPagingService,
        private modalService: NzModalService,
        private searchService: SearchService,
        private vars: Vars,
        private router: Router,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, clientePerfilObrigacoesPagingService);

        this.convertDatesObjects = true;
    }
}
