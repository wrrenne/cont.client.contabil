import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { ClientesTableComponent } from 'src/app/contabil/clientes/components/clientes-table/clientes-table';
import { ClientesParameter } from 'src/app/contabil/models/clientes/parameters';
import { UserAvatarComponent } from 'src/app/shared/control/components/user-avatar/user-avatar';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { Vars } from 'src/app/shared/variables';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { PostParameter } from '../../../../shared/timeline/models/parameters';
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
    providers: [NzModalService],
    imports: [CommonModule, Profile2Component, NzTabsModule, UserDadosComponent, UserAvatarComponent, UserDepartamentosComponent, ClientesTableComponent],
})
export class UserPage implements OnInit {
    id?: number;
    subTitle: string;
    user: ContabilUserView;
    usersParameters: UsersParameter;
    obrigacoesParameters: ObrigacoesParameter;
    postParameter: PostParameter;
    tabIndex: number = 0;

    clientesParameters: ClientesParameter;

    mes: Date;

    constructor(
        private route: ActivatedRoute,
        private usersService: ContabilUsersService,
        private encryptionService: EncryptionService,
        dateUtilsService: DateUtilsService,
        private vars: Vars,
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

            this.clientesParameters = {
                userId: id,
                searchText: r['q'],
                dataInicial: this.vars.dataInicial!,
                dataFinal: this.vars.dataFinal!,
            };

            //this.obrigacoesParameters = { userId: id, mes: this.mes, tipo: TObrigacaoTipo.Imposto };
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
