import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PagingBase } from '../../../models';
import { Vars } from '../../../variables';
import { SistemaCadastroPageItem } from '../../models/pagings';
import { SistemaCadastrosPagingService } from '../../services/pagings/sistemaCadastros.service';
import { SistemaCadastroModalComponent } from '../sistema-cadastro-modal/sistema-cadastro-modal';

export interface SistemaCadastroParameter {
    cadastroId: number;
}

@Component({
    selector: 'cadastro-sistemas',
    templateUrl: './cadastro-sistemas.html',
    standalone: true,
    providers: [NzModalService],
    imports: [CommonModule, NzModalModule, InfiniteScrollDirective],
})
export class CadastroSistemasComponent extends PagingBase<SistemaCadastroPageItem> {
    private _parameters?: SistemaCadastroParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: SistemaCadastroParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        this.param.routeStrings = [];
        this.param.routeStrings.push(value.cadastroId.toString());

        this.param.queryStrings.clear();

        this.refresh();
    }

    constructor(
        injector: Injector,
        private vars: Vars,
        sistemaCadastrosPagingService: SistemaCadastrosPagingService,
        private modalService: NzModalService,
    ) {
        super(injector, sistemaCadastrosPagingService);
    }

    sistemaNovoModal() {
        const modal = this.modalService.create({
            nzContent: SistemaCadastroModalComponent,
            nzWidth: 570,
            nzClosable: false,
            nzFooter: null,
            nzData: {
                cadastroId: this.parameters?.cadastroId,
            },
        });

        modal.afterClose.subscribe((r) => {
            if (r != undefined && r) {
                this.refresh();
            }
        });
    }
}
