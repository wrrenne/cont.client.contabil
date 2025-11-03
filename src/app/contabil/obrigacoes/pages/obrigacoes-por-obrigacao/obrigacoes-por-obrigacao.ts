import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest, Subscription } from 'rxjs';
import { PeriodoSelecaoModalComponent } from 'src/app/contabil/components/periodo-selecao-modal/periodo-selecao-modal';
import { TObrigacaoTipo } from 'src/app/contabil/models/enums';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrObrigacoesTableComponent } from '../../components/obr-obrigacoes-table/obr-obrigacoes-table';

@Component({
    selector: 'obrigacoes-por-obrigacao-page',
    templateUrl: './obrigacoes-por-obrigacao.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, ObrObrigacoesTableComponent, NzTabsModule, ButtonDefaultComponent],
    standalone: true,
})
export class ObrigacoesPorObrigacaoPage implements OnInit, OnDestroy {
    obrigacoesImpostosParameters: ObrigacoesParameter;
    obrigacoesAcessoriasParameters: ObrigacoesParameter;
    obrigacoesRelatoriosParameters: ObrigacoesParameter;

    subTitle: string;

    private periodoSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
        private dateUtilsService: DateUtilsService,
    ) {}

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.getData();
        });

        this.periodoSubscription = this.vars.periodo$.subscribe((_) => {
            this.getData();
        });
    }

    ngOnDestroy() {
        if (this.periodoSubscription) this.periodoSubscription.unsubscribe();
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

    PeriodoSelecaoModalOpen() {
        const modal = this.modalService.create({
            nzContent: PeriodoSelecaoModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,
        });
    }
}
