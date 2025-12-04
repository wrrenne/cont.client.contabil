import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TObrigacaoStatus } from 'src/app/contabil/models/enums';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { ContUserPageItem } from 'src/app/contabil/models/users/pageItems';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { ValueAndPercentageComponent } from 'src/app/shared/controls/value-and-percentage/value-and-percentage';
import { PagingBase } from 'src/app/shared/models';
import { SearchService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
import { Vars } from '../../../../shared/variables';
import { UsersComObrigacoesPagingService } from '../../services/pagings/usersComObrigacoes.service';

@Component({
    selector: 'obr-users-table',
    templateUrl: './obr-users-table.html',
    standalone: true,
    imports: [CommonModule, RouterLink, AvatarTitleComponent, PercentageBarComponent, ValueAndPercentageComponent],
})
export class ObrUsersTableComponent extends PagingBase<ContUserPageItem> {
    searchSubscription: Subscription;

    status: TObrigacaoStatus;

    private _parameters?: ObrigacoesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        if (value?.departamentoId != undefined) {
            this.param.queryStrings.set('departamentoId', value.departamentoId);
        }

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

        this.status = value?.status!;

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        obrigacoesComObrigacoesPagingService: UsersComObrigacoesPagingService,
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

    get debug() {
        return environment.debug;
    }
}
