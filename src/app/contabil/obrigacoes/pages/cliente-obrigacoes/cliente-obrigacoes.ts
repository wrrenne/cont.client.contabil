import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest, Subscription } from 'rxjs';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { TObrigacaoTipo } from 'src/app/contabil/models/enums';
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
    providers: [NzModalService],
    imports: [NzTabsModule, ClienteObrigacoesTableComponent, Profile2Component, ButtonDefaultComponent, NgIconComponent, MonthButtonsComponent],
    standalone: true,
})
export class ClienteObrigacoesPage implements OnInit {
    clienteId: number;
    impostosParameters: ObrigacoesParameter;
    acessoriasParameters: ObrigacoesParameter;
    relatoriosParameters: ObrigacoesParameter;

    mesAtual: Date;

    title: string;
    mesFormat: string;

    private periodoSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
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

            this.setMesButtons();
            this.getData();
        });
    }

    setMesButtons() {
        this.mesAtual = this.vars.periodo?.dataInicial!;
    }

    getData() {
        this.mesFormat = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

        //var mes = this.vars.dataInicial;

        this.clientesService.clienteGet(this.clienteId).subscribe((x) => {
            this.title = x.obj.nome;
            //this.subTitle = x.obj.regime;
            this.impostosParameters = {
                clienteId: this.clienteId,
                mesInicial: this.vars.dataInicial!,
                mesFinal: this.vars.dataFinal!,
                tipo: TObrigacaoTipo.Imposto,
            };
            this.acessoriasParameters = {
                clienteId: this.clienteId,
                mesInicial: this.vars.dataInicial!,
                mesFinal: this.vars.dataFinal!,
                tipo: TObrigacaoTipo.Acessoria,
            };
            this.relatoriosParameters = {
                clienteId: this.clienteId,
                mesInicial: this.vars.dataInicial!,
                mesFinal: this.vars.dataFinal!,
                tipo: TObrigacaoTipo.Relatorio,
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
