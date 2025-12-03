import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest, Subscription } from 'rxjs';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { TObrigacaoStatus, TObrigacaoTipo } from 'src/app/contabil/models/enums';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { MonthButtonsComponent } from 'src/app/shared/controls/month-buttons/month-buttons';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ClienteObrigacoesTableComponent } from '../../components/cliente-obrigacoes-table/cliente-obrigacoes-table';

@Component({
    selector: 'cliente-obrigacoes-page',
    templateUrl: './cliente-obrigacoes.html',
    imports: [NzTabsModule, ClienteObrigacoesTableComponent, Profile2Component, ButtonDefaultComponent, MonthButtonsComponent],
    providers: [NzModalService],
    standalone: true,
})
export class ClienteObrigacoesPage implements OnInit {
    clienteId: number;
    impostosParameters: ObrigacoesParameter;
    acessoriasParameters: ObrigacoesParameter;
    relatoriosParameters: ObrigacoesParameter;

    mesAtual: Date;

    title: string;
    subTitle: string;

    status?: TObrigacaoStatus;

    private periodoSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private router: Router,
        private dateUtilsService: DateUtilsService,
        private clientesService: ClientesService,
        private periodoRefreshService: PeriodoRefreshService,
    ) {}

    ngOnInit(): void {
        this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
            this.setMesButtons();
            this.getData();
        });

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.clienteId = this.encryptionService.decrypt(r['id']);
            this.status = r['status'];

            this.setMesButtons();
            this.getData();
        });
    }

    setMesButtons() {
        this.mesAtual = this.vars.periodo?.dataInicial!;
    }

    getData() {
        this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

        this.clientesService.clienteGet(this.clienteId).subscribe((x) => {
            this.title = x.obj.nome;
            this.impostosParameters = {
                clienteId: this.clienteId,
                mesInicial: this.vars.dataInicial!,
                mesFinal: this.vars.dataFinal!,
                tipo: TObrigacaoTipo.Imposto,
                status: this.status,
            };
            this.acessoriasParameters = {
                clienteId: this.clienteId,
                mesInicial: this.vars.dataInicial!,
                mesFinal: this.vars.dataFinal!,
                tipo: TObrigacaoTipo.Acessoria,
                status: this.status,
            };
            this.relatoriosParameters = {
                clienteId: this.clienteId,
                mesInicial: this.vars.dataInicial!,
                mesFinal: this.vars.dataFinal!,
                tipo: TObrigacaoTipo.Relatorio,
                status: this.status,
            };
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    cadastroClick() {
        this.router.navigate(['/sistema/clientes/cliente', this.encryptionService.encrypt(this.clienteId)]);
    }

    monthClicked(mes: Date) {
        this.mesAtual = mes;

        this.vars.periodo = {
            dataInicial: mes,
            dataFinal: this.dateUtilsService.lastDateOfMonth(mes),
        };
    }
}
