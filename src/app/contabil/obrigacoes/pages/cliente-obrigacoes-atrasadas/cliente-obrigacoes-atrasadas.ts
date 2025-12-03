import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest, Subscription } from 'rxjs';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { TObrigacaoStatus } from 'src/app/contabil/models/enums';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ClienteObrigacoesTableComponent } from '../../components/cliente-obrigacoes-table/cliente-obrigacoes-table';

@Component({
    selector: 'cliente-obrigacoes-atrasadas-page',
    templateUrl: './cliente-obrigacoes-atrasadas.html',
    providers: [NzModalService],
    imports: [NzTabsModule, ClienteObrigacoesTableComponent, Profile2Component, ButtonDefaultComponent],
    standalone: true,
})
export class ClienteObrigacoesAtrasadasPage implements OnInit {
    clienteId: number;
    obrigacoesParameters: ObrigacoesParameter;

    mesAtual: Date;

    title: string;
    subTitle: string;

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
        this.subTitle = `Obrigações Atrasadas em ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

        this.clientesService.clienteGet(this.clienteId).subscribe((x) => {
            this.title = x.obj.nome;

            this.obrigacoesParameters = {
                clienteId: this.clienteId,
                mesInicial: this.vars.dataInicial!,
                mesFinal: this.vars.dataFinal!,
                status: TObrigacaoStatus.EmAbertoAtrasado,
            };
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    cadastroClick() {
        this.router.navigate(['/sistema/clientes/cliente', this.encryptionService.encrypt(this.clienteId)]);
    }
}
