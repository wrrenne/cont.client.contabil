import { Component, Injector, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { NoDataPanelComponent } from 'src/app/shared/controls/no-data-panel/no-data-panel';
import { PagingBase } from '../../../../shared/models';
import { ClientePerfilObrigacaoPageItem } from '../../../models/obrigacoes/pagings';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesUtilsService } from '../../services/obrigacoesUtils.service';
import { ClienteObrigacoesAvulsasPagingService } from '../../services/pagings/clienteObrigacoesMes.service copy';
import { ClienteObrigacaoAvulsaNovoModalComponent } from '../cliente-obrigacao-avulsa-novo/cliente-obrigacao-avulsa-novo';

@Component({
    selector: 'cliente-obrigacoes-avulsas-table',
    templateUrl: './cliente-obrigacoes-avulsas-table.html',
    imports: [InfiniteScrollDirective, AvatarTitleComponent, NoDataPanelComponent, NzSkeletonComponent, ButtonDefaultComponent],
})
export class ClienteObrigacoesAvulsasTableComponent extends PagingBase<ClientePerfilObrigacaoPageItem> implements OnInit {
    public _parameters?: ObrigacoesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        if (value == null) return;

        this._parameters = value;
        this.param.routeStrings = [];
        this.param.routeStrings.push(value.clienteId!.toString());
        this.param.routeStrings.push(this.dateUtilsService.firstDateOfCurrentMonthIso());

        this.param.queryStrings.clear();

        if (value.tipo) this.param.queryStrings.set('tipo', value.tipo);

        if (value.departamentoId) this.param.queryStrings.set('departamentoId', value.departamentoId);

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        clienteObrigacoesAvulsasPagingService: ClienteObrigacoesAvulsasPagingService,
        private modalService: NzModalService,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, clienteObrigacoesAvulsasPagingService);

        this.convertDatesObjects = true;
    }

    clienteObrigacaoAvulsaNovo() {
        const modal = this.modalService.create({
            nzContent: ClienteObrigacaoAvulsaNovoModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                clienteId: <number>this.parameters?.clienteId,
            },
        });
    }
}
