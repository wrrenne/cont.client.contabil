import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { UserObrigacoesTableComponent } from 'src/app/contabil/obrigacoes/components/user-obrigacoes-table/user-obrigacoes-table';
import { UserAvatarComponent } from 'src/app/shared/control/components/user-avatar/user-avatar';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { PostParameter } from '../../../../shared/timeline/models/parameters';
import { TObrigacaoTipo } from '../../../models/enums';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { UsersParameter } from '../../../models/users/parameters';
import { ContabilUserView } from '../../../models/users/views';
import { UserDadosComponent } from '../../components/user-dados/user-dados';
import { UserDepartamentosComponent } from '../../components/user-departamentos/user-departamentos';
import { ContabilUsersService } from '../../services/contabilUsers.service';

@Component({
    selector: 'user-page',
    standalone: true,
    templateUrl: './user.html',
    imports: [Profile2Component, NzTabsModule, UserObrigacoesTableComponent, UserDadosComponent, UserAvatarComponent, UserDepartamentosComponent],
})
export class UserPage implements OnInit {
    id?: number;
    subTitle: string;
    user: ContabilUserView;
    usersParameters: UsersParameter;
    obrigacoesParameters: ObrigacoesParameter;
    postParameter: PostParameter;
    tabIndex: number = 0;

    mes: Date;

    constructor(
        private route: ActivatedRoute,
        private modalService: NzModalService,
        private encryptionService: EncryptionService,
        private usersService: ContabilUsersService,
        dateUtilsService: DateUtilsService,
    ) {
        this.mes = dateUtilsService.firstDateOfCurrentMonth();
    }

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            const id: number = this.encryptionService.decrypt(r['id']);

            this.getData(id);

            this.id = id;
            this.obrigacoesParameters = { userId: id, mes: this.mes, tipo: TObrigacaoTipo.Imposto };
        });

        this.usersParameters = {};
    }

    getData(id: number) {
        this.usersService.contabilUserGet(id).subscribe((x) => {
            this.user = x.obj;
        });
    }

    titleOnChange(e: string) {
        this.subTitle = e;
    }
}
