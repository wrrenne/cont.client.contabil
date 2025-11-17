import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PagingBase } from '../../../../shared/models';
import { DashIfEmptyPipe } from '../../../../shared/pipes/dash-if-empty.pipe';
import { PerfilPageItem } from '../../../models/clientes/pageItems';
import { PerfisParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesUtilsService } from '../../services/obrigacoesUtils.service';
import { PerfisPagingService } from '../../services/pagings/perfis.service';
import { PerfilObrigacoesModalComponent } from '../perfil-obrigacoes-modal/perfil-obrigacoes-modal';

@Component({
    selector: 'perfis-table',
    standalone: true,
    imports: [InfiniteScrollDirective, AvatarTitleComponent, DashIfEmptyPipe],
    templateUrl: './perfis-table.html',
})
export class PerfisTableComponent extends PagingBase<PerfilPageItem> implements OnInit {
    @Output() onClick = new EventEmitter<number>();

    public _parameters?: PerfisParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: PerfisParameter | undefined) {
        if (value == null) return;

        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        perfisPagingService: PerfisPagingService,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
        private modalService: NzModalService,
    ) {
        super(injector, perfisPagingService);
    }

    modalClosed(pageItem: PerfilPageItem) {
        this.datas.push(pageItem);
    }

    //perfilNovoModal() {
    //        const modal = this.modalService.create({
    //            nzContent: PerfilNovoModalComponent,
    //            nzWidth: 570,
    //            nzClosable: false,
    //            nzFooter: null,
    //        })

    //        modal.afterClose.subscribe(r => {
    //            if (r) this.modalClosed(r)
    //        })
    //}

    obrigacaoNovoModal() {
        //    const modal = this.modalService.create({
        //        nzContent: ObrigacaoNovoModalComponent,
        //        nzWidth: 770,
        //        nzClosable: false,
        //        nzFooter: null,
        //    })
        //    modal.afterClose.subscribe(r => {
        //        if (r) this.modalClosed(r)
        //    })
    }

    perfilObrigacoesModal(perfilItemId: number) {
        const modal = this.modalService.create({
            nzContent: PerfilObrigacoesModalComponent,
            nzWidth: 770,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                perfilItemId: perfilItemId,
            },
        });
        modal.afterClose.subscribe((r) => {
            if (r) this.modalClosed(r);
        });
    }

    getEnc(id: number) {
        return this.encryptionService.encrypt(id);
    }
}
