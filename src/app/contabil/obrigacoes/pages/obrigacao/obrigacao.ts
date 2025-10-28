import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { ObrigacaoUsersParameter, ObrigacaoUsersTableComponent } from 'src/app/contabil/users/components/obrigacao-users-table/obrigacao-users-table';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { UserPreferencesService } from '../../../../shared/control/userPreferences/services/userPreferences.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { TEsfera } from '../../../models/enums';
import { ObrigacaoView } from '../../../models/obrigacoes/views';
import { ObrigacaoDadosComponent } from '../../components/obrigacao-dados/obrigacao-dados';
import { ObrigacaoGedConfiguracaoComponent } from '../../components/obrigacao-ged-configuracao/obrigacao-ged-configuracao';
import { ObrigacaoVencimentosEPrazosComponent } from '../../components/obrigacao-vencimentos-e-prazos/obrigacao-vencimentos-e-prazos';
import { ObrigacoesService } from '../../services/obrigacoes.service';

@Component({
    selector: 'obrigacao-page',
    templateUrl: './obrigacao.html',
    providers: [NzModalService],
    imports: [
        CommonModule,
        Profile2Component,
        NzTabsModule,
        ObrigacaoDadosComponent,
        ObrigacaoVencimentosEPrazosComponent,
        ObrigacaoGedConfiguracaoComponent,
        ObrigacaoUsersTableComponent,
    ],
})
export class ObrigacaoPage {
    // obrigacoesParameters: ObrigacoesParameter;
    usersParameter: ObrigacaoUsersParameter;
    subTitle: string;

    mes: Date;

    obrigacao: ObrigacaoView;
    TEsfera = TEsfera;

    tabIndex: number = 0;

    constructor(
        private route: ActivatedRoute,
        private encryptionService: EncryptionService,
        private obrigacoesService: ObrigacoesService,
        private dateUtilsService: DateUtilsService,
        private userPreferencesService: UserPreferencesService,
    ) {}

    ngOnInit(): void {
        this.mes = this.dateUtilsService.firstDateOfCurrentMonth();

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            const tab: number | undefined = r['tab'];

            if (tab) {
                this.tabIndex = tab;
            }

            let id = this.encryptionService.decrypt(r['id']);
            this.getData(id);

            //this.obrigacoesSidebarParameters = { perfilItemId: r['pi'], searchText: r['q'] }

            this.usersParameter = { obrigacaoId: id, mes: this.mes };
            //this.obrigacoesParameters = { obrigacaoId: id, mes: this.mes };

            //    this.userPreferencesService.userPrefSave(TUserPrefTipo.Obrigacoes, id.toString(), true).subscribe()
        });
    }

    getData(id: number) {
        this.obrigacoesService.obrigacaoGet(id).subscribe((x) => {
            this.obrigacao = x.obj;
            console.log(this.obrigacao);
        });
    }

    titleOnChange(e: string) {
        this.subTitle = e;
    }
}
