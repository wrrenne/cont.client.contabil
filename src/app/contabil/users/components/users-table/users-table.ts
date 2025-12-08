import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { ContUserPageItem } from 'src/app/contabil/models/users/pageItems';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PagingBase } from '../../../../shared/models';
import { CustomDateTimePipe } from '../../../../shared/pipes/customDateTime.pipe';
import { SearchService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { UsersParameter } from '../../../models/users/parameters';
import { ObrigacoesUtilsService } from '../../../obrigacoes/services/obrigacoesUtils.service';
import { CadastroUsersService } from '../../services/pagings/cadastroUsersGet.service';
import { ContabilUserNovoModalComponent } from '../contabil-user-novo-modal/contabil-user-novo-modal';

@Component({
    selector: 'users-table',
    standalone: true,
    templateUrl: './users-table.html',
    imports: [CommonModule, RouterLink, CustomDateTimePipe, InfiniteScrollDirective, AvatarTitleComponent],
})
export class UsersTableComponent extends PagingBase<ContUserPageItem> implements OnInit {
    @Output() onClick = new EventEmitter<number>();

    searchSubscription: Subscription;

    private _parameters?: UsersParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: UsersParameter | undefined) {
        if (value == null) return;

        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        this.param.q = value.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        cadastroUsersService: CadastroUsersService,
        private modalService: NzModalService,
        private vars: Vars,
        private searchService: SearchService,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, cadastroUsersService);
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

    userNovoModal() {
        const modal = this.modalService.create({
            nzContent: ContabilUserNovoModalComponent,
            nzWidth: 570,
            nzClosable: false,
            nzFooter: null,
        });

        modal.afterClose.subscribe((r) => {
            if (r) this.modalClosed(r);
        });
    }

    modalClosed(pageItem: ContUserPageItem) {
        this.datas.push(pageItem);
    }
}
