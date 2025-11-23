import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest, Subscription } from 'rxjs';
import { PeriodoSelecaoModalComponent } from 'src/app/contabil/components/periodo-selecao-modal/periodo-selecao-modal';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrUsersTableComponent } from '../../components/obr-users-table/obr-users-table';

@Component({
    selector: 'obrigacoes-por-user-page',
    templateUrl: './obrigacoes-por-user.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, ButtonDefaultComponent, ObrUsersTableComponent],
    standalone: true,
})
export class ObrigacoesPorUserPage implements OnInit, OnDestroy {
    usersParameters: ObrigacoesParameter;

    subTitle: string;

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
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.getData(this.encryptionService.decrypt(r['id'], r['q']));
        });

        this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
            this.getData();
        });
    }

    ngOnDestroy() {
        if (this.periodoSubscription) this.periodoSubscription.unsubscribe();
    }

    getData(userId?: number, searchText?: string) {
        this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

        this.usersParameters = { departamentoId: 8, searchText: searchText, mesInicial: this.vars.dataInicial!, mesFinal: this.vars.dataFinal! };
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
