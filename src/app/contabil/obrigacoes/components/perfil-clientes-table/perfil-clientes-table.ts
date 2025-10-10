import { Component, Injector, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { HyperlinkButtonComponent } from 'src/app/shared/controls/hyperlink-button/hyperlink-button';
import { PagingBase } from '../../../../shared/models';
import { ClientePerfilPageItem } from '../../../models/obrigacoes/pagings';
import { PerfilClientesParameter } from '../../../models/obrigacoes/parameters';
import { PerfilClientesPagingService } from '../../services/pagings/perfil-clientes.service';
import { PerfilClienteAssociarModalComponent } from '../perfil-cliente-associar-modal/perfil-cliente-associar-modal';

@Component({
    selector: 'perfil-clientes-table',
    templateUrl: './perfil-clientes-table.html',
    imports: [RouterLink, NgIcon, InfiniteScrollDirective, NzDropdownMenuComponent, NzDropDownModule, HyperlinkButtonComponent],
})
export class PerfilClientesTableComponent extends PagingBase<ClientePerfilPageItem> {
    @Input() displayType = 'grid'; // 'grid' | 'list'

    public perfilItemId: number;

    private _parameters?: PerfilClientesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: PerfilClientesParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        this.param.routeStrings = [];
        this.param.routeStrings.push(value.perfilItemId.toString());
        this.perfilItemId = value.perfilItemId;
        this.param.q = value?.searchText;
        this.refresh();
    }

    expandSet = new Set<number>();

    constructor(
        injector: Injector,
        perfilClientesPagingService: PerfilClientesPagingService,
        private modalService: NzModalService,
    ) {
        super(injector, perfilClientesPagingService);
    }

    perfilAssociarOpen() {
        const modal = this.modalService.create({
            nzContent: PerfilClienteAssociarModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                perfilItemId: this.perfilItemId,
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
