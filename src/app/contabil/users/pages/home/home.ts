import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest } from 'rxjs';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { Vars } from '../../../../shared/variables';
import { UsersParameter } from '../../../models/users/parameters';
import { UserNovoModalComponent } from '../../components/user-novo-modal/user-novo-modal';
import { UsersTableComponent } from '../../components/users-table/users-table';

@Component({
    selector: 'users-home',
    standalone: true,
    templateUrl: './home.html',
    imports: [UsersTableComponent, PageTitleComponent],
})
export class UsersHomePage {
    parameters: UsersParameter;

    subTitle: string;
    searchUser = '';
    displayType = 'list';

    constructor(
        private route: ActivatedRoute,
        private modalService: NzModalService,
        private vars: Vars,
    ) {}

    ngOnInit(): void {
        //this.vars.search = { title: "Pesquisar Usuários", placeholder: "Pesquisar usuários" }

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.parameters = { searchText: r['q'] };
        });
    }

    //titleOnChange(e: string) {
    //    this.subTitle = e
    //}

    userNovoOpenModal() {
        const modal = this.modalService.create({
            nzContent: UserNovoModalComponent,
            nzWidth: 570,
            nzClosable: false,
            nzFooter: null,
        });

        //modal.afterClose.subscribe(r => this.funcionarioNovo = r);

        //const instance = modal.getContentComponent();
        //modal.afterClose.subscribe(result => this.onEspelhoUpdate.emit(result));
    }

    search() {
        //this.filterdContactsList = this.contactList.filter((d) => d.name.toLowerCase().includes(this.searchUser.toLowerCase()));
    }
}
