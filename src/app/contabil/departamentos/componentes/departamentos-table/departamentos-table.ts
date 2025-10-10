import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PagingBase } from '../../../../shared/models';
import { FormatSingularPluralPipe } from '../../../../shared/pipes/singular-plural.pipe';
import { SearchService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { DepartamentoPageItem } from '../../../models/contabil/pageItems';
import { DepartamentosParameter } from '../../../models/contabil/parameters';
import { ObrigacoesUtilsService } from '../../../obrigacoes/services/obrigacoesUtils.service';
import { DepartamentosPagingService } from '../../services/pagings';

@Component({
    selector: 'departamentos-table',
    standalone: true,
    imports: [RouterLink, InfiniteScrollDirective, AvatarTitleComponent, FormatSingularPluralPipe],
    templateUrl: './departamentos-table.html',
})
export class DepartamentosTableComponent extends PagingBase<DepartamentoPageItem> implements OnInit {
    @Input() link: string;

    searchSubscription: Subscription;

    @Output() onClick = new EventEmitter<number>();
    perfilItemId: number;

    private _parameters?: DepartamentosParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: DepartamentosParameter | undefined) {
        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        departamentosPagingService: DepartamentosPagingService,
        private vars: Vars,
        private searchService: SearchService,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, departamentosPagingService);
        //    this.vars.search = { showSearchBox: false }

        //    this.searchSubscription = this.searchService.onMessage().subscribe(x => {
        //        var p = this.parameters
        //        p!.searchText = x
        //        this.parameters = p
        //    });
    }

    //override ngOnDestroy() {
    //    super.ngOnDestroy()
    //    this.vars.search = null
    //    if (this.searchSubscription)
    //        this.searchSubscription.unsubscribe()
    //}

    override ngOnInit(): void {
        super.ngOnInit();
    }

    //    modalClosed(pageItem: ContabilClientePageItem) {
    //        let index = this.datas.findIndex(x => x.id == pageItem.id)

    //        if (index == -1)
    //            this.datas.push(pageItem)
    //    }
}
