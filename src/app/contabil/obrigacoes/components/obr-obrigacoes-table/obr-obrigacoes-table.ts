import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { ObrigacaoPageItem } from 'src/app/contabil/models/obrigacoes/pagings';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { ContUserPageItem } from 'src/app/contabil/models/users/pageItems';
import { AvatarIconEmptyComponent } from 'src/app/shared/controls/avatar-icon-empty/avatar-icon-empty';
import { AvatarIconComponent } from 'src/app/shared/controls/avatar-icon/avatar-icon';
import { AvatarImageGroupComponent } from 'src/app/shared/controls/avatar-image-group/avatar-image-group';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { ValueAndPercentageComponent } from 'src/app/shared/controls/value-and-percentage/value-and-percentage';
import { PagingBase } from '../../../../shared/models';
import { SearchService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesComObrigacoesPagingService } from '../../services/pagings/obrigacoesComObrigacoes.service';

@Component({
    selector: 'obr-obrigacoes-table',
    templateUrl: './obr-obrigacoes-table.html',
    standalone: true,
    imports: [
        CommonModule,
        InfiniteScrollDirective,
        AvatarTitleComponent,
        RouterLink,
        PercentageBarComponent,
        AvatarIconComponent,
        AvatarIconEmptyComponent,
        AvatarImageGroupComponent,
        ValueAndPercentageComponent,
    ],
})
export class ObrObrigacoesTableComponent extends PagingBase<ObrigacaoPageItem> {
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

        if (value?.tipo != undefined) {
            this.param.queryStrings.set('tipo', value.tipo);
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
        obrigacoesComObrigacoesPagingService: ObrigacoesComObrigacoesPagingService,
        private vars: Vars,
        private searchService: SearchService,
    ) {
        super(injector, obrigacoesComObrigacoesPagingService);
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

    // override ngOnInit(): void {
    //     super.ngOnInit();
    // }

    modalClosed(pageItem: ObrigacaoPageItem) {
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
