import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest, Subscription } from 'rxjs';
import { DepartamentosService } from 'src/app/contabil/departamentos/services/departamentos.service';
import { DepartamentoView } from 'src/app/contabil/models/contabil/views';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { MonthButtonsComponent } from 'src/app/shared/controls/month-buttons/month-buttons';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrUsersTableComponent } from '../../components/obr-users-table/obr-users-table';

@Component({
    selector: 'obrigacoes-departamento-por-user-page',
    templateUrl: './obrigacoes-departamento-por-user.html',
    imports: [PageTitleComponent, NzTabsModule, MonthButtonsComponent, ObrUsersTableComponent],
    standalone: true,
})
export class ObrigacoesDepartamentoPorUserPage implements OnInit, OnDestroy {
    mesAtual: Date;

    usersParameters: ObrigacoesParameter;

    title: string;
    subTitle: string;

    departamento: DepartamentoView;

    private periodoSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private dateUtilsService: DateUtilsService,
        private periodoRefreshService: PeriodoRefreshService,
        private departamentosService: DepartamentosService,
    ) {}

    ngOnInit(): void {
        this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
            this.setMesButtons();
            this.getData(this.departamento.id!);
        });

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.setMesButtons();

            this.getData(r['id']);
        });
    }

    setMesButtons() {
        this.mesAtual = this.vars.periodo?.dataInicial!;
    }

    ngOnDestroy() {
        if (this.periodoSubscription) this.periodoSubscription.unsubscribe();
    }

    getData(departamentoId: number) {
        this.departamentosService.departamentoGet(departamentoId).subscribe((x) => {
            this.departamento = x.obj;
            this.title = x.obj.nome;
            this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;
            this.usersParameters = { departamentoId: departamentoId, mesInicial: this.vars.dataInicial!, mesFinal: this.vars.dataFinal! };
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    monthClicked(mes: Date) {
        this.mesAtual = mes;

        this.vars.periodo = {
            dataInicial: mes,
            dataFinal: this.dateUtilsService.lastDateOfMonth(mes),
        };
    }
}
