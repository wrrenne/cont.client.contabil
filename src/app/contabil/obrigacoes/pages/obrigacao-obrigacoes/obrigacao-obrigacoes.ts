import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest, Subscription } from 'rxjs';
import { TObrigacaoStatus } from 'src/app/contabil/models/enums';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { MonthButtonsComponent } from 'src/app/shared/controls/month-buttons/month-buttons';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacaoObrigacoesTableComponent } from '../../components/obrigacao-obrigacoes-table/obrigacao-obrigacoes-table';
import { ObrigacoesService } from '../../services/obrigacoes.service';

@Component({
    selector: 'obrigacao-obrigacoes-page',
    templateUrl: './obrigacao-obrigacoes.html',
    providers: [NzModalService],
    imports: [NzTabsModule, ObrigacaoObrigacoesTableComponent, Profile2Component, ButtonDefaultComponent, MonthButtonsComponent],
    standalone: true,
})
export class ObrigacaoObrigacoesPage implements OnInit {
    parameters: ObrigacoesParameter;

    obrigacaoId: number;

    mesAtual: Date;

    private periodoSubscription: Subscription;

    title: string;
    subTitle: string;

    status?: TObrigacaoStatus;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
        private dateUtilsService: DateUtilsService,
        private obrigacoesService: ObrigacoesService,
        private periodoRefreshService: PeriodoRefreshService,
    ) {}

    ngOnInit(): void {
        this.setMesButtons();

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.obrigacaoId = this.encryptionService.decrypt(r['id']);
            this.status = r['status'];
            this.getData();
        });

        this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
            this.setMesButtons();
            this.getData();
        });
    }

    getData() {
        this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

        this.obrigacoesService.obrigacaoGet(this.obrigacaoId).subscribe((x) => {
            this.title = x.obj.descricao;
            this.parameters = {
                obrigacaoId: this.obrigacaoId,
                mesInicial: this.vars.dataInicial!,
                mesFinal: this.vars.dataFinal!,
                status: this.status,
            };
        });
    }

    ngOnDestroy() {
        if (this.periodoSubscription) this.periodoSubscription.unsubscribe();
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    cadastroClick() {
        this.router.navigate(['/sistema/obrigacoes/obrigacao', this.encryptionService.encrypt(this.obrigacaoId)]);
    }

    monthClicked(mes: Date) {
        this.mesAtual = mes;

        this.vars.periodo = {
            dataInicial: mes,
            dataFinal: this.dateUtilsService.lastDateOfMonth(mes),
        };
    }

    setMesButtons() {
        this.mesAtual = this.vars.periodo?.dataInicial!;
    }
}
