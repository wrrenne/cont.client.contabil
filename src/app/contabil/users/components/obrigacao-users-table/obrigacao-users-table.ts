import { Component, Injector, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { PagingBase } from '../../../../shared/models';
import { Vars } from '../../../../shared/variables';
import { ClienteUserPageItem } from '../../../models/users/pageItems';
import { ObrigacoesUtilsService } from '../../services/obrigacoesUtils.service';

export interface ObrigacaoUsersParameter {
    obrigacaoId: number;
    searchText?: string;
}

@Component({
    selector: 'obrigacao-users-table',
    standalone: true,
    templateUrl: './obrigacao-users-table.html',
    imports: [RouterLink, InfiniteScrollDirective, AvatarTitleComponent, ButtonDefaultComponent],
})
export class ObrigacaoUsersTableComponent extends PagingBase<ClienteUserPageItem> {
    public obrigacaoId: number;

    private _parameters?: ObrigacaoUsersParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ObrigacaoUsersParameter | undefined) {
        if (value == undefined) return;

        this.obrigacaoId = value.obrigacaoId;

        this._parameters = value;

        this.param.routeStrings = [];
        //this.param.routeStrings.push((<number>this.vars.cadastro?.id).toString())
        this.param.routeStrings.push(value.obrigacaoId.toString());
        this.param.routeStrings.push(this.dateUtilsService.firstDateOfCurrentMonthIso());

        //this.param.queryStrings.clear()
        //this.param.queryStrings.set('clienteId', value.clienteId.toString())

        this.param.q = value?.searchText;
        this.refresh();
    }

    constructor(
        injector: Injector,
        private vars: Vars,
        obrigacaoUsersGetPagingService: ObrigacaoUsersGetPagingService,
        private modalService: NzModalService,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, obrigacaoUsersGetPagingService);
    }

    //userInternoInserted(clienteUserInterno: UserPageItem[]) {
    //    this.datas.push(...clienteUserInterno)
    //}

    clienteUserAssociarOpenModal() {
        const modal = this.modalService.create({
            nzContent: ObrigacaoUserAssociarModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                clienteId: <number>this.obrigacaoId,
                clienteNome: 'Novo Colaborador',
            },
        });

        modal.afterClose.subscribe((r) => {
            if (r) this.modalClosed(r);
        });
    }

    modalClosed(pageItem: ClienteUserPageItem) {
        this.datas.push(pageItem);
    }
}
