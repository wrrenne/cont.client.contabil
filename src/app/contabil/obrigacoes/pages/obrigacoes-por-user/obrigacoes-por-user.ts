import { Component, ComponentRef, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Subscription } from 'rxjs';
import { DepartamentosService } from 'src/app/contabil/departamentos/services/departamentos.service';
import { DepartamentoListingItem } from 'src/app/contabil/models/contabil/listings/departamentoListingItem';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { MonthButtonsComponent } from 'src/app/shared/controls/month-buttons/month-buttons';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrUsersTableComponent } from '../../components/obr-users-table/obr-users-table';

interface DynamicTab {
    title: string;
    component: Type<any>;
    inputValue: any;
    instanceRef?: ComponentRef<any>;
}

@Component({
    selector: 'obrigacoes-por-user-page',
    templateUrl: './obrigacoes-por-user.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, NzTabsModule, MonthButtonsComponent],
    standalone: true,
})
export class ObrigacoesPorUserPage implements OnDestroy {
    departamentos: DepartamentoListingItem[];

    mesAtual: Date;

    tabs: DynamicTab[] = [];

    @ViewChild('tabContent', { read: ViewContainerRef, static: false })
    tabContent!: ViewContainerRef;

    selectedIndex = 0;

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
        private departamentosService: DepartamentosService,
    ) {}

    ngAfterViewInit(): void {
        this.setMesButtons();
        this.getData();

        this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
            this.setMesButtons();
            this.selectTab(this.selectedIndex);
        });

        // this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
        //     this.getData();
        // });

        // const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
        //     ...params,
        //     ...queryParams,
        // }));

        // urlParametrs.subscribe((r) => {
        //     this.getData(this.encryptionService.decrypt(r['id'], r['q']));
        // });

        // this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
        //     this.getData();
        // });
    }

    setMesButtons() {
        this.mesAtual = this.vars.periodo?.dataInicial!;
    }

    ngOnDestroy() {
        if (this.periodoSubscription) this.periodoSubscription.unsubscribe();
    }

    getData(searchText?: string) {
        this.departamentosService.departamentosListingItemsByCadastroIdGet().subscribe((x) => {
            this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

            this.departamentos = x.obj;
            this.departamentos.map((x) => {
                if (x.contabil || x.pessoal || x.fiscal) {
                    this.addTab(x.nome, { departamentoId: x.id, searchText: searchText, mesInicial: this.vars.dataInicial!, mesFinal: this.vars.dataFinal! });
                }
            });
            this.selectTab(0);
        });

        // this.usersParameters = { departamentoId: 8, searchText: searchText, mesInicial: this.vars.dataInicial!, mesFinal: this.vars.dataFinal! };
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

    addTab(tabName: string, value: ObrigacoesParameter) {
        this.tabs.push({
            title: tabName,
            component: ObrUsersTableComponent,
            inputValue: value,
        });
    }

    selectTab(i: number) {
        if (!this.tabContent) return;

        this.selectedIndex = i;

        const tab = this.tabs[i];

        this.tabContent.clear();

        const compRef = this.tabContent.createComponent(tab.component);

        compRef.instance.parameters = tab.inputValue;

        tab.instanceRef = compRef;
    }

    monthClicked(mes: Date) {
        this.selectTab(this.selectedIndex);
        this.mesAtual = mes;

        this.vars.periodo = {
            dataInicial: mes,
            dataFinal: this.dateUtilsService.lastDateOfMonth(mes),
        };
    }
}
