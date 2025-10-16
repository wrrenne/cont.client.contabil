import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { PagingBase } from '../../../../shared/models';
import { SearchService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ContabilClientePageItem } from '../../../models/clientes/pageItems';
import { ClientesParameter } from '../../../models/clientes/parameters';
import { ClientesPagingService } from '../../services/pagings/clientes.service';

@Component({
    selector: 'clientes-table',
    templateUrl: './clientes-table.html',
    standalone: true,
    imports: [CommonModule, InfiniteScrollDirective, AvatarTitleComponent, RouterLink, PercentageBarComponent],
})
export class ClientesTableComponent extends PagingBase<ContabilClientePageItem> implements OnInit {
    searchSubscription: Subscription;

    @Output() onClick = new EventEmitter<number>();
    perfilItemId: number;

    @Input() showStats = false;

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
        clientesPagingService: ClientesPagingService,
        private vars: Vars,
        private searchService: SearchService,
    ) {
        super(injector, clientesPagingService);
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
}
