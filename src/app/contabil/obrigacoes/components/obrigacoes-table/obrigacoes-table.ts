import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { NoDataPanelComponent } from 'src/app/shared/controls/no-data-panel/no-data-panel';
import { DropDownRadioComponent, RadioItem } from '../../../../shared/controls/dropdown-radio/dropdown-radio';
import { SetorDescription, TSetor } from '../../../../shared/enums';
import { PagingBase } from '../../../../shared/models';
import { SearchService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { TEsfera, TObrigacaoTipo } from '../../../models/enums';
import { ObrigacaoPageItem } from '../../../models/obrigacoes/pagings';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesUtilsService } from '../../services/obrigacoesUtils.service';
import { ObrigacoesPagingService } from '../../services/pagings/obrigacoes.service';
import { ObrigacaoNovoModalComponent } from '../obrigacao-novo-modal/obrigacao-novo-modal';
import { PerfilObrigacaoAssociarModalComponent } from '../perfil-obrigacao-associar-modal/perfil-obrigacao-associar-modal';

@Component({
    selector: 'obrigacoes-table',
    templateUrl: './obrigacoes-table.html',
    imports: [
        RouterLink,
        InfiniteScrollDirective,
        DropDownRadioComponent,
        ButtonDefaultComponent,
        AvatarTitleComponent,
        NoDataPanelComponent,
        NzSkeletonComponent,
    ],
})
export class ObrigacoesTableComponent extends PagingBase<ObrigacaoPageItem> implements OnInit {
    @Input() link: string;

    perfilItemId?: number;

    searchSubscription: Subscription;

    @Output() onClick = new EventEmitter<number>();

    TObrigacaoTipo = TObrigacaoTipo;
    TEsfera = TEsfera;

    //obrigacaoTipos: RadioItem[] = [
    //    {
    //        value: TObrigacaoTipo.Imposto,
    //        text: ObrigacaoTipoDescription.get(TObrigacaoTipo.Imposto)!,
    //        checked: true
    //    },
    //    {
    //        value: TObrigacaoTipo.Acessoria,
    //        text: ObrigacaoTipoDescription.get(TObrigacaoTipo.Acessoria)!,
    //        checked: true
    //    },
    //    {
    //        value: TObrigacaoTipo.Relatorio,
    //        text: ObrigacaoTipoDescription.get(TObrigacaoTipo.Relatorio)!,
    //        checked: true
    //    },
    //]

    setores: RadioItem[] = [
        {
            value: TSetor.Fiscal,
            text: SetorDescription.get(TSetor.Fiscal)!,
            checked: true,
        },
        {
            value: TSetor.Contabil,
            text: SetorDescription.get(TSetor.Contabil)!,
            checked: true,
        },
        {
            value: TSetor.Pessoal,
            text: SetorDescription.get(TSetor.Pessoal)!,
            checked: true,
        },
    ];

    public _parameters?: ObrigacoesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        if (value == null) return;

        this._parameters = value;
        this.param.routeStrings = [];

        this.param.queryStrings.clear();
        this.perfilItemId = value.perfilItemId;

        if (value?.perfilItemId != undefined) {
            this.param.queryStrings.set('pi', value.perfilItemId);
        }

        if (value.tipo) this.param.queryStrings.set('tipo', value.tipo);

        if (value.departamentoId) this.param.queryStrings.set('departamentoId', value.departamentoId);

        //if (value?.tipos != undefined && value?.tipos != '') {
        //    this.param.queryStrings.set('tipos', value.tipos)
        //}

        //if (value?.departamentoIds != undefined && value?.departamentoIds != '') {
        //    this.param.queryStrings.set('departamentoIds', value.departamentoIds)
        //}

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        obrigacoesPagingService: ObrigacoesPagingService,
        private modalService: NzModalService,
        private searchService: SearchService,
        private vars: Vars,
        private router: Router,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, obrigacoesPagingService);

        this.convertDatesObjects = true;

        this.vars.search = { showSearchBox: false };

        this.searchSubscription = this.searchService.onMessage().subscribe((x) => {
            var p = this.parameters;
            p!.searchText = x;
            this.parameters = p;
        });
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.vars.search = null;
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
    }

    obrigacaoNovoModal(tipo: TObrigacaoTipo) {
        const modal = this.modalService.create({
            nzContent: ObrigacaoNovoModalComponent,
            nzWidth: 470,
            nzClosable: false,
            nzFooter: null,
            nzData: {
                tipo: tipo,
            },
        });

        modal.afterClose.subscribe((r) => {
            if (r) {
                this.router.navigate(['/sistema/obrigacoes/obrigacao', this.getEncryptedId(r)]);
            }
        });
    }

    //obrigacaoNovoModal() {
    //    const modal = this.modalService.create({
    //        nzContent: ObrigacaoNovoModalComponent,
    //        nzWidth: 770,
    //        nzClosable: false,
    //        nzFooter: null,
    //    })

    //    modal.afterClose.subscribe(r => {
    //        if (r) this.modalClosed(r)
    //    })
    //}

    perfilObrigacaoAssociarModal() {
        const modal = this.modalService.create({
            nzContent: PerfilObrigacaoAssociarModalComponent,
            nzWidth: 500,
            nzClosable: false,
            nzFooter: null,
            nzData: {
                perfilItemId: this.parameters?.perfilItemId,
                tipo: this.parameters?.tipo,
            },
        });

        modal.afterClose.subscribe((r) => {
            if (r) this.modalClosed(r);
        });
    }

    modalClosed(pageItem: ObrigacaoPageItem) {
        let index = this.datas.findIndex((x) => x.id == pageItem.id);

        if (index == -1) this.datas.push(pageItem);
    }

    //perfilObrigacaoAssociarModalClosed(pageItem: ObrigacaoPageItem) {
    //    this.datas.push(pageItem)
    //}

    getObrigacaoTipoCor(tipo: TObrigacaoTipo): string {
        switch (tipo) {
            case TObrigacaoTipo.Imposto:
                return 'red';
            case TObrigacaoTipo.Acessoria:
                return 'blue';
            case TObrigacaoTipo.Relatorio:
                return 'green';
        }

        return '';
    }

    getObrigacaoSetorCor(tipo: TSetor): string {
        switch (tipo) {
            case TSetor.Fiscal:
                return 'red2';
            case TSetor.Contabil:
                return 'blue2';
            case TSetor.Pessoal:
                return 'green2';
        }

        return '';
    }

    getObrigacaoEsferaCor(tipo: TEsfera): string {
        switch (tipo) {
            case TEsfera.Municipal:
                return 'indigo';
            case TEsfera.Estadual:
                return 'pink';
            case TEsfera.Federal:
                return 'purple';
        }
    }

    getEnc(id: number) {
        return this.encryptionService.encrypt(id);
    }

    obrigacaoTipoChanged(e: any) {
        var par = this.parameters;
        par!.tipo = e;
        this.parameters = par;
    }

    setorChanged(e: any) {
        var par = this.parameters;
        par!.departamentoId = e;
        this.parameters = par;
    }
}
