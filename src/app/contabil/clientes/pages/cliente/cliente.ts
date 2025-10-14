import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { ClientePerfisTableComponent } from 'src/app/contabil/obrigacoes/components/cliente-perfis-table/cliente-perfis-table';
import { ClienteUsersParameter, ClienteUsersTableComponent } from 'src/app/contabil/users/components/cliente-users-table/cliente-users-table';
import { ClienteArquivosDisponibilizadosWidgetComponent } from 'src/app/contabil/widgets/components/cliente-arquivos-disponibilizados-widget/cliente-arquivos-disponibilizados-widget';
import { ClienteDesdeWidgetComponent } from 'src/app/contabil/widgets/components/cliente-desde-widget/cliente-desde-widget';
import { ClienteSolicitacoesAtendidasWidgetComponent } from 'src/app/contabil/widgets/components/cliente-solicitacoes-atendidas-widget/cliente-solicitacoes-atendidas-widget';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { TUserPrefTipo } from '../../../../shared/control/models/enums';
import { UserPreferencesService } from '../../../../shared/control/userPreferences/services/userPreferences.service';
import { FilesParameter } from '../../../../shared/ged/controls/files-table/files-table';
import { PastasParameter } from '../../../../shared/ged/models/parameters';
import { GedService } from '../../../../shared/ged/services/ged.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClienteSenhasParameter, ClientesParameter } from '../../../models/clientes/parameters';
import { ContabilClienteView } from '../../../models/clientes/views';
import { ClientePerfisParameter } from '../../../models/obrigacoes/parameters';
import { ClienteAvatarEditComponent } from '../../components/cliente-avatar-edit/cliente-avatar-edit';
import { ClienteDadosComponent } from '../../components/cliente-dados/cliente-dados';
import { ClienteEnderecos } from '../../components/cliente-enderecos/cliente-enderecos';
import { ClientesService } from '../../services/clientes.service';

@Component({
    selector: 'cliente',
    templateUrl: './cliente.html',
    standalone: true,
    providers: [NzModalService],
    imports: [
        CommonModule,
        NzTabsModule,
        ClienteDesdeWidgetComponent,
        ClienteArquivosDisponibilizadosWidgetComponent,
        ClienteSolicitacoesAtendidasWidgetComponent,
        ClienteDadosComponent,
        ClienteAvatarEditComponent,
        ClienteEnderecos,
        Profile2Component,
        ClienteUsersTableComponent,
        ClientePerfisTableComponent,
    ],
})
export class ClientePage implements OnInit {
    cliente: ContabilClienteView;
    clientePerfisParameters: ClientePerfisParameter;
    usersParameter: ClienteUsersParameter;
    clienteSenhasParameter: ClienteSenhasParameter;
    clientesParameters: ClientesParameter;
    //obrigacoesParameters: ObrigacoesParameter;
    //arquivosParameters: ArquivosParameter
    pastasParameters: PastasParameter;
    filesParameters: FilesParameter;
    tabIndex: number = 0;

    firstFormGroup: FormGroup;

    mes: Date;

    constructor(
        private route: ActivatedRoute,
        private clientesService: ClientesService,
        private encryptionService: EncryptionService,
        private userPreferencesService: UserPreferencesService,
        private gedService: GedService,
        private vars: Vars,
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
            const perfilItemId: number = this.encryptionService.decrypt(r['pi']);

            this.clientesParameters = { perfilItemId: perfilItemId, searchText: r['q'] };
            this.usersParameter = { clienteId: id };
            this.clientePerfisParameters = { clienteId: id };
            this.clienteSenhasParameter = { clienteId: id };
            //this.obrigacoesParameters = { clienteId: id, mes: this.mes, tipo: TObrigacaoTipo.Imposto };

            this.getData(id);

            this.pastasParameters = { cadastroId: id, userId: this.vars.user?.id, searchText: r['q'] };
            this.filesParameters = { cadastroId: id };

            //this.gedService.pastaCadastroIdGet(id).subscribe(x => {
            //    this.pastasParameters = { id: x.obj!, rootId: x.obj! }
            ////    this.arquivosParameters = {
            ////        pastaId: x.obj!,
            ////        showChildren: false
            ////    }
            //})

            this.userPreferencesService.userPrefSave(TUserPrefTipo.Clientes, id.toString(), true).subscribe();
        });
    }

    getData(id: number) {
        this.clientesService.clienteGet(id).subscribe((x) => {
            this.cliente = x.obj;
        });
    }

    planoContasClick(e: any) {
        this.filesParameters = { cadastroId: this.filesParameters.cadastroId, pastaId: e };
    }
}
