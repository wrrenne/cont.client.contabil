import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { TObrigacaoTipo } from '../../../models/enums';
import { ObrigacoesParameter, PerfilClientesParameter } from '../../../models/obrigacoes/parameters';
import { PerfilItemView } from '../../../models/obrigacoes/views';
import { ObrigacoesTableComponent } from '../../components/obrigacoes-table/obrigacoes-table';
import { PerfilClientesTableComponent } from '../../components/perfil-clientes-table/perfil-clientes-table';
import { PerfilsDadosComponent } from '../../components/perfil-dados/perfil-dados';
import { PerfisService } from '../../services/perfis.service';

@Component({
    selector: 'perfil-page',
    templateUrl: './perfil.html',
    imports: [NzTabsModule, PerfilsDadosComponent, Profile2Component, PerfilClientesTableComponent, ObrigacoesTableComponent],
})
export class PerfilPage {
    obrigacoesImpostosParameters: ObrigacoesParameter;
    obrigacoesRelatoriosParameters: ObrigacoesParameter;
    obrigacoesAcessoriasParameters: ObrigacoesParameter;
    clientesParameters: PerfilClientesParameter;

    subTitle: string;

    mes: Date;

    perfilItem: PerfilItemView;

    tabIndex: number = 0;

    constructor(
        private route: ActivatedRoute,
        private encryptionService: EncryptionService,
        private perfisService: PerfisService,
        private dateUtilsService: DateUtilsService,
        //private userPreferencesService: UserPreferencesService,
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

            this.obrigacoesImpostosParameters = { tipo: TObrigacaoTipo.Imposto, perfilItemId: +r['id'] };
            this.obrigacoesAcessoriasParameters = { tipo: TObrigacaoTipo.Acessoria, perfilItemId: +r['id'] };
            this.obrigacoesRelatoriosParameters = { tipo: TObrigacaoTipo.Relatorio, perfilItemId: +r['id'] };

            this.clientesParameters = { perfilItemId: +r['id'] };

            //this.userPreferencesService.userPrefSave(TUserPrefTipo.Obrigacoes, id.toString(), true).subscribe()
        });
    }

    getData(id: number) {
        this.perfisService.perfilItemGet(id).subscribe((x) => {
            this.perfilItem = x.obj;
        });
    }

    titleOnChange(e: string) {
        this.subTitle = e;
    }
}
