import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest, Subscription } from 'rxjs';
import { TObrigacaoTipo } from 'src/app/contabil/models/enums';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { MonthButtonsComponent } from 'src/app/shared/controls/month-buttons/month-buttons';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrObrigacoesTableComponent } from '../../components/obr-obrigacoes-table/obr-obrigacoes-table';

@Component({
    selector: 'obrigacoes-por-obrigacao-page',
    templateUrl: './obrigacoes-por-obrigacao.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, ObrObrigacoesTableComponent, NzTabsModule, MonthButtonsComponent],
    standalone: true,
})
export class ObrigacoesPorObrigacaoPage implements OnInit, OnDestroy {
    obrigacoesImpostosParameters: ObrigacoesParameter;
    obrigacoesAcessoriasParameters: ObrigacoesParameter;
    obrigacoesRelatoriosParameters: ObrigacoesParameter;

    subTitle: string;

    mesAtual: Date;

    private periodoSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
        private periodoRefreshService: PeriodoRefreshService,
        private dateUtilsService: DateUtilsService,
    ) {}

    ngOnInit(): void {
        this.setMesButtons();

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.getData();
        });

        this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
            this.setMesButtons();
            this.getData();
        });
    }

    setMesButtons() {
        this.mesAtual = this.vars.periodo?.dataInicial!;
    }

    ngOnDestroy() {
        this.periodoSubscription.unsubscribe();
    }

    getData(perfilItemId?: number, searchText?: string) {
        this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

        this.obrigacoesImpostosParameters = {
            tipo: TObrigacaoTipo.Imposto,
            perfilItemId: perfilItemId,
            searchText,
            mesInicial: this.vars.dataInicial!,
            mesFinal: this.vars.dataFinal!,
        };
        this.obrigacoesAcessoriasParameters = {
            tipo: TObrigacaoTipo.Acessoria,
            perfilItemId: perfilItemId,
            searchText,
            mesInicial: this.vars.dataInicial!,
            mesFinal: this.vars.dataFinal!,
        };
        this.obrigacoesRelatoriosParameters = {
            tipo: TObrigacaoTipo.Relatorio,
            perfilItemId: perfilItemId,
            searchText,
            mesInicial: this.vars.dataInicial!,
            mesFinal: this.vars.dataFinal!,
        };
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    // PeriodoSelecaoModalOpen() {
    //     const modal = this.modalService.create({
    //         nzContent: PeriodoSelecaoModalComponent,
    //         nzWidth: 460,
    //         nzClosable: false,
    //         nzFooter: null,
    //     });
    // }

    monthClicked(mes: Date) {
        this.mesAtual = mes;

        this.vars.periodo = {
            dataInicial: mes,
            dataFinal: this.dateUtilsService.lastDateOfMonth(mes),
        };
    }
}
