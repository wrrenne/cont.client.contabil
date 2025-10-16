import { Component, Injector, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { NoDataPanelComponent } from 'src/app/shared/controls/no-data-panel/no-data-panel';
import { PagingBase } from '../../../../shared/models';
import { ClientePerfilPageItem } from '../../../models/obrigacoes/pagings';
import { ClientePerfisParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesUtilsService } from '../../services/obrigacoesUtils.service';
import { ClientePerfisPagingService } from '../../services/pagings/cliente-perfis.service';
import { ClientePerfilAssociarModalComponent } from '../cliente-perfil-associar-modal/cliente-perfil-associar-modal';

@Component({
    selector: 'cliente-perfis-table',
    templateUrl: './cliente-perfis-table.html',
    imports: [ButtonDefaultComponent, AvatarTitleComponent, NoDataPanelComponent],
})
export class ClientePerfisTableComponent extends PagingBase<ClientePerfilPageItem> {
    //descriptionBase = { none: "", plural: "{0} perfis", singular: "1 perfil" }

    public clienteId: number;

    private _parameters?: ClientePerfisParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ClientePerfisParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        this.param.routeStrings = [];
        this.param.routeStrings.push(value.clienteId.toString());
        this.param.routeStrings.push(this.dateUtilsService.firstDateOfCurrentMonthIso());

        this.clienteId = value.clienteId;
        this.param.q = value?.searchText;
        this.refresh();
    }

    expandSet = new Set<number>();

    constructor(
        injector: Injector,
        clientesPagingService: ClientePerfisPagingService,
        private modalService: NzModalService,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, clientesPagingService);
    }

    perfilAssociarOpen() {
        const modal = this.modalService.create({
            nzContent: ClientePerfilAssociarModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                clienteId: <number>this.clienteId,
            },
        });

        modal.afterClose.subscribe((r) => {
            if (r) this.modalClosed(r);
        });
    }

    modalClosed(pageItem: ClientePerfilPageItem) {
        this.datas.push(pageItem);
    }

    onExpandChange(id: number, checked: boolean): void {
        if (checked) {
            this.expandSet.add(id);
        } else {
            this.expandSet.delete(id);
        }
    }

    perfilItemInserted(clientePerfilItem: ClientePerfilPageItem[]) {
        this.datas.push(clientePerfilItem[0]);
    }
}
