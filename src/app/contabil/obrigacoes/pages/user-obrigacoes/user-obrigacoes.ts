import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { TObrigacaoStatus, TObrigacaoTipo } from 'src/app/contabil/models/enums';
import { ContabilUsersService } from 'src/app/contabil/users/services/contabilUsers.service';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { UserObrigacoesTableComponent } from '../../components/user-obrigacoes-table/user-obrigacoes-table';
import { ObrigacoesService } from '../../services/obrigacoes.service';

@Component({
    selector: 'user-obrigacoes-page',
    templateUrl: './user-obrigacoes.html',
    providers: [NzModalService],
    imports: [NzTabsModule, Profile2Component, ButtonDefaultComponent, UserObrigacoesTableComponent],
    standalone: true,
})
export class UserObrigacoesPage implements OnInit {
    parameters: ObrigacoesParameter;

    userId: number;

    title: string;
    subTitle: string;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
        private dateUtilsService: DateUtilsService,
        private obrigacoesService: ObrigacoesService,
        private contabilUsersService: ContabilUsersService,
    ) {}

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.userId = this.encryptionService.decrypt(r['id']);

            this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

            this.contabilUsersService.contabilUserGet(this.userId).subscribe((x) => {
                this.title = x.obj.userNome;
                this.parameters = {
                    userId: this.userId,
                    mesInicial: this.vars.dataInicial!,
                    mesFinal: this.vars.dataFinal!,
                    status: TObrigacaoStatus.EmAbertoAtrasado,
                    tipo: TObrigacaoTipo.Acessoria,
                };
            });
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    // cadastroClick() {
    //     this.router.navigate(['/sistema/obrigacoes/obrigacao', this.encryptionService.encrypt(this.obrigacaoId)]);
    // }
}
