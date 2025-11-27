import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest, Subscription } from 'rxjs';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { MonthButtonsComponent } from 'src/app/shared/controls/month-buttons/month-buttons';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrClientesTableComponent } from '../../components/obr-clientes-table/obr-clientes-table';

export class MesButton {
    mesFormat: string;
    mes: Date;
}

@Component({
    selector: 'obrigacoes-por-cliente-page',
    templateUrl: './obrigacoes-por-cliente.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, ObrClientesTableComponent, MonthButtonsComponent],
    standalone: true,
})
export class ObrigacoesPorClientePage implements OnInit, OnDestroy {
    clientesParameters: ObrigacoesParameter;

    subTitle: string;

    mesAtual: Date;

    private periodoSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private dateUtilsService: DateUtilsService,
        private periodoRefreshService: PeriodoRefreshService,
    ) {}

    ngOnInit(): void {
        this.setMesButtons();

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.getData(this.encryptionService.decrypt(r['pi'], r['q']));
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
        if (this.periodoSubscription) this.periodoSubscription.unsubscribe();
    }

    getData(perfilItemId?: number, searchText?: string) {
        this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

        this.clientesParameters = { perfilItemId: perfilItemId, searchText: searchText, mesInicial: this.vars.dataInicial!, mesFinal: this.vars.dataFinal! };
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
