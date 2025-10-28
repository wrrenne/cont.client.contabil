import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { ObrigacaoPageItem } from 'src/app/contabil/models/obrigacoes/pagings';
import { AvatarIconComponent } from 'src/app/shared/controls/avatar-icon/avatar-icon';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { PagingBase } from '../../../../shared/models';
import { SearchService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClientesParameter } from '../../../models/clientes/parameters';
import { ObrigacoesPagingService } from '../../services/pagings/obrigacoes.service';

@Component({
    selector: 'obr-obrigacoes-table',
    templateUrl: './obr-obrigacoes-table.html',
    standalone: true,
    imports: [CommonModule, InfiniteScrollDirective, AvatarTitleComponent, RouterLink, PercentageBarComponent, AvatarIconComponent],
})
export class ObrObrigacoesTableComponent extends PagingBase<ObrigacaoPageItem> implements OnInit {
    searchSubscription: Subscription;

    @Output() onClick = new EventEmitter<number>();
    perfilItemId: number;

    private _parameters?: ClientesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ClientesParameter | undefined) {
        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        if (value?.perfilItemId != undefined) {
            this.param.queryStrings.set('pi', value.perfilItemId);
        }

        this.perfilItemId = value?.perfilItemId ?? 0;

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        obrigacoesPagingService: ObrigacoesPagingService,
        private vars: Vars,
        private searchService: SearchService,
    ) {
        super(injector, obrigacoesPagingService);
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

    modalClosed(pageItem: ObrigacaoPageItem) {
        let index = this.datas.findIndex((x) => x.id == pageItem.id);

        if (index == -1) this.datas.push(pageItem);
    }
}
