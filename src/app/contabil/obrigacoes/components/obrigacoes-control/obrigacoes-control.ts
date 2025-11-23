import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
import { Subject, Subscription } from 'rxjs';
import { TObrigacaoClientePeriodoPor } from 'src/app/contabil/models/enums';
import { ObrigacaoClientePeriodoPageItem } from 'src/app/contabil/models/obrigacoes/pagings';
import { environment } from '../../../../../environments/environment';
import { NoDataPanelComponent } from '../../../../shared/controls/no-data-panel/no-data-panel';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { ObrigacaoCardModalComponent } from '../obrigacao-card-modal/obrigacao-card-modal';
import { ObrigacaoItem } from '../obrigacao-item/obrigacao-item';

export interface ObrigacoesControlParameter {
    tipo: TObrigacaoClientePeriodoPor;
    obrigacoes: ObrigacaoClientePeriodoPageItem[];
}

@Component({
    selector: 'obrigacoes-control',
    standalone: true,
    imports: [NzSkeletonComponent, NoDataPanelComponent, ObrigacaoItem, NgIcon],
    templateUrl: './obrigacoes-control.html',
})
export class ObrigacoesControl implements OnDestroy {
    TObrigacaoClientePeriodoPor = TObrigacaoClientePeriodoPor;

    public Observable = new Subject<string>();

    obrigacoes: ObrigacaoClientePeriodoPageItem[];
    tipo: TObrigacaoClientePeriodoPor;

    @Input() loading = false;

    @Output() onObrigacaoUpdate = new EventEmitter<ObrigacaoClientePeriodoPageItem[]>();

    subscription: Subscription;

    @Input()
    set parameter(value: ObrigacoesControlParameter) {
        this.obrigacoes = value.obrigacoes;
        this.tipo = value.tipo;
    }

    constructor(
        private encryption: EncryptionService,
        private dateUtils: DateUtilsService,
        private modalService: NzModalService,
    ) {}

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }

    obrigacaoUpdate(e: ObrigacaoClientePeriodoPageItem[]) {
        e.map((obrigacao, i) => {
            i = this.obrigacoes.findIndex((y) => y.id == obrigacao.id);

            // if (i >= 0) {
            //     if (
            //         // se estiver na tela de tratamento e nao tem nao tratados, remove o espelho
            //         (this.tipo == TEspelhoTipo.PorExtras && !obrigacao.calculos.extraNaoTratado) ||
            //         (this.tipo == TEspelhoTipo.PorAtrasos && !obrigacao.calculos.atrasoNaoTratado) ||
            //         (this.tipo == TEspelhoTipo.PorFaltas && obrigacao.status.faltaStatus != TCalculoStatus.FaltaNaoTratado) ||
            //         (this.tipo == TEspelhoTipo.PorMarcacoesFaltantes &&
            //             obrigacao.marcacoesExigidas &&
            //             obrigacao.marcacoesQte &&
            //             obrigacao.marcacoesQte == obrigacao.marcacoesExigidas)
            //     ) {
            //         this.espelhos.splice(i, 1);
            //     } else {
            //         // atualiza o espelho
            //         this.espelhos[i] = obrigacao;
            //     }
            // }
        });

        this.onObrigacaoUpdate.emit(e);
    }

    getFragment(funcionarioId: number | undefined, data: string | null) {
        return `${<number>funcionarioId}_${<string>data}`;
    }

    focarElemento(funcionarioId: number, data: string) {
        const elemento = document.getElementById(this.getFragment(funcionarioId, data));
        const offset = 70; // Offset of 30 pixels below

        if (elemento) {
            const elementPosition = elemento.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
    }

    trackById(index: any, tipo: any) {
        return tipo.id;
    }

    get isDebug(): boolean {
        return environment.debug;
    }

    getNoDataTitle(): string {
        return 'Nenhuma obrigação';
    }

    obrigacaoCardModalOpen(obrigacaoClientePeriodoId: number) {
        const modal = this.modalService.create({
            nzContent: ObrigacaoCardModalComponent,
            nzWidth: 570,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                obrigacaoClientePeriodoId: obrigacaoClientePeriodoId,
            },
        });

        // Access component instance
        const instance = modal.getContentComponent();

        // Subscribe to your custom event
        instance.onObrigacaoUpdate.subscribe((obrigacao: ObrigacaoClientePeriodoPageItem) => {
            this.updateRow(obrigacao);
        });
    }

    updateRow(e: ObrigacaoClientePeriodoPageItem) {
        var i = this.obrigacoes.findIndex((y) => y.id == e.id);

        if (i >= 0) this.obrigacoes[i] = e;
        else this.obrigacoes.push(e);
    }
}
