import { Component, Injector, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { PagingBase } from '../../../../shared/models';
import { Vars } from '../../../../shared/variables';
import { ClienteUserPageItem } from '../../../models/users/pageItems';
import { ObrigacoesUtilsService } from '../../../obrigacoes/services/obrigacoesUtils.service';
import { ClienteUsersGetPagingService } from '../../services/pagings/clienteUsersGet.service';
import { ClienteUserAssociarModalComponent } from '../cliente-user-associar-modal/cliente-user-associar-modal';

export interface ClienteUsersParameter {
    clienteId: number;
    searchText?: string;
}

@Component({
    selector: 'cliente-users-table',
    standalone: true,
    templateUrl: './cliente-users-table.html',
    imports: [RouterLink, InfiniteScrollDirective, AvatarTitleComponent, ButtonDefaultComponent],
})
export class ClienteUsersTableComponent extends PagingBase<ClienteUserPageItem> {
    // descriptionBase = { none: '', plural: '{0} usuários', singular: '1 usuário' };

    public clienteId: number;

    private _parameters?: ClienteUsersParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ClienteUsersParameter | undefined) {
        if (value == undefined) return;

        this.clienteId = value.clienteId;

        this._parameters = value;

        this.param.routeStrings = [];
        //this.param.routeStrings.push((<number>this.vars.cadastro?.id).toString())
        this.param.routeStrings.push(value.clienteId.toString());
        this.param.routeStrings.push(this.dateUtilsService.firstDateOfCurrentMonthIso());

        //this.param.queryStrings.clear()
        //this.param.queryStrings.set('clienteId', value.clienteId.toString())

        this.param.q = value?.searchText;
        this.refresh();
    }

    constructor(
        injector: Injector,
        private vars: Vars,
        clienteUsersGetPagingService: ClienteUsersGetPagingService,
        private modalService: NzModalService,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, clienteUsersGetPagingService);
    }

    //userInternoInserted(clienteUserInterno: UserPageItem[]) {
    //    this.datas.push(...clienteUserInterno)
    //}

    clienteUserAssociarOpenModal() {
        const modal = this.modalService.create({
            nzContent: ClienteUserAssociarModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                clienteId: <number>this.clienteId,
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
