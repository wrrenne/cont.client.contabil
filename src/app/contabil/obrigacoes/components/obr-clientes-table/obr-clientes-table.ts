import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { ClientesComObrigacoesPagingService } from 'src/app/contabil/clientes/services/pagings';
import { PerfilTagComponent } from 'src/app/contabil/components/perfil-tag/perfil-tag';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { ContUserPageItem } from 'src/app/contabil/models/users/pageItems';
import { AvatarIconEmptyComponent } from 'src/app/shared/controls/avatar-icon-empty/avatar-icon-empty';
import { AvatarIconComponent } from 'src/app/shared/controls/avatar-icon/avatar-icon';
import { AvatarImageGroupComponent } from 'src/app/shared/controls/avatar-image-group/avatar-image-group';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { DashIfEmptyPipe } from 'src/app/shared/pipes';
import { PagingBase } from '../../../../shared/models';
import { SearchService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ContabilClientePageItem } from '../../../models/clientes/pageItems';

@Component({
    selector: 'obr-clientes-table',
    templateUrl: './obr-clientes-table.html',
    standalone: true,
    imports: [
        CommonModule,
        InfiniteScrollDirective,
        AvatarTitleComponent,
        RouterLink,
        PercentageBarComponent,
        AvatarIconComponent,
        AvatarImageGroupComponent,
        AvatarIconEmptyComponent,
        PerfilTagComponent,
        DashIfEmptyPipe,
    ],
})
export class ObrClientesTableComponent extends PagingBase<ContabilClientePageItem> implements OnInit {
    searchSubscription: Subscription;

    @Output() onClick = new EventEmitter<number>();
    perfilItemId: number;

    private _parameters?: ObrigacoesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        if (value?.perfilItemId != undefined) {
            this.param.queryStrings.set('pi', value.perfilItemId);
        }

        if (value?.mesInicial) {
            this.param.queryStrings.set('mesInicial', this.dateUtilsService.GetDateIsoString(this.vars.dataInicial!));
        }

        if (value?.mesFinal) {
            this.param.queryStrings.set('mesFinal', this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.vars.dataFinal!)));
        }

        this.perfilItemId = value?.perfilItemId ?? 0;

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        clientesComObrigacoesPagingService: ClientesComObrigacoesPagingService,
        private vars: Vars,
        private searchService: SearchService,
    ) {
        super(injector, clientesComObrigacoesPagingService);
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

    override ngOnInit(): void {
        super.ngOnInit();
    }

    modalClosed(pageItem: ContabilClientePageItem) {
        let index = this.datas.findIndex((x) => x.id == pageItem.id);

        if (index == -1) this.datas.push(pageItem);
    }

    getUsuariosId(users?: ContUserPageItem[]): number[] {
        return users != undefined ? users?.map((x) => x.userId!) : [];
    }

    getUsuariosNome(users?: ContUserPageItem[]): string[] {
        return users != undefined ? users?.map((x) => x.userNomeFormat) : [];
    }

    getDepartamentosNome(users?: ContUserPageItem[]): string[] {
        return users != undefined ? users?.map((x) => x.departamentoNome) : [];
    }
}
