import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Injector, Input, Output, ViewChild } from '@angular/core';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { AvatarImageVerticalGroupComponent } from 'src/app/shared/controls/avatar-image-vertical-group/avatar-image-vertical-group';
import { LabelIconComponent } from 'src/app/shared/controls/label-icon/label-icon';
import { LabelTextComponent } from 'src/app/shared/controls/label-text/label-text';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { environment } from '../../../../../environments/environment';
import { BlinkBorderDirective } from '../../../../shared/directives/blinkBorder.directive';
import { EncryptionService } from '../../../../shared/services';
import { TimelineCommentButton } from '../../../../shared/timeline/controls/timeline-comment-form/timeline-comment-form';
import { TPostTipo } from '../../../../shared/timeline/enums';
import { CommentPageItem } from '../../../../shared/timeline/models/pagings';
import { TimelinesService } from '../../../../shared/timeline/services/timelines.service';
import { Vars } from '../../../../shared/variables';
import { TEsfera, TObrigacaoClientePeriodoPor, TObrigacaoStatus } from '../../../models/enums';
import { ObrigacaoClientePeriodoPageItem, ObrigacaoClientePeriodoUserPageItem } from '../../../models/obrigacoes/pagings';
import { ObrigacoesService } from '../../services/obrigacoes.service';
import { ObrigacaoConclusaoModalComponent } from '../obrigacao-conclusao-modal/obrigacao-conclusao-modal';
import { ObrigacaoItemArquivosComponent } from '../obrigacao-item-arquivos/obrigacao-item-arquivos';

export class ObrigacaoCardModalData {
    obrigacaoClientePeriodoId: number;
}

@Component({
    selector: 'obrigacao-card-modal',
    templateUrl: './obrigacao-card-modal.html',
    imports: [LabelTextComponent, LabelIconComponent, ObrigacaoItemArquivosComponent, DatePipe, ModalBaseComponent, AvatarImageVerticalGroupComponent],
})
export class ObrigacaoCardModalComponent extends ModalBaseComponent {
    TEsfera = TEsfera;
    TPostTipo = TPostTipo;
    TObrigacaoStatus = TObrigacaoStatus;
    TObrigacaoClientePeriodoPor = TObrigacaoClientePeriodoPor;

    @Input() obrigacao: ObrigacaoClientePeriodoPageItem;
    @Input() obrigacaoClientePeriodoPor: TObrigacaoClientePeriodoPor = TObrigacaoClientePeriodoPor.PorCliente;

    @Output() onObrigacaoUpdate = new EventEmitter<ObrigacaoClientePeriodoPageItem>();

    @ViewChild(BlinkBorderDirective) blinkDirective: BlinkBorderDirective;

    verMaisExpandido = true;

    get isFuncionario() {
        return this.vars.funcionario != undefined;
    }

    constructor(
        private modalService: NzModalService,
        private encryptionService: EncryptionService,
        private vars: Vars,
        private timelinesService: TimelinesService,
        private obrigacoesService: ObrigacoesService,
        injector: Injector,
        @Inject(NZ_MODAL_DATA) data: ObrigacaoCardModalData,
    ) {
        super(injector);
        this.getData(data.obrigacaoClientePeriodoId);
    }

    openObrigacaoConclusaoModal() {
        let modal = this.modalService.create({
            nzContent: ObrigacaoConclusaoModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,
            nzData: {
                obrigacaoClientePeriodoId: <number>this.obrigacao.id,
            },
        });

        modal.afterClose.subscribe((result: number[] | null) => {
            if (result) this.getData(this.obrigacao.id!);
        });
    }

    timelinebuttons: TimelineCommentButton[] = [
        {
            label: 'Concluir',
            icon: 'iconoirSettingsProfiles',
            handler: this.openObrigacaoConclusaoModal.bind(this),
        },
    ];

    //tratamentoOpen(tratamentoTipo: TTratamentoTipo) {
    //    let modal: any

    //    //if (!this.isFuncionario) {
    //    modal = this.modalService.create({
    //        nzContent: TratamentoApontamentoModalComponent,
    //        nzWidth: 570,
    //        nzClosable: false,
    //        nzFooter: null,
    //        nzData: {
    //            apontamentoId: <number>this.espelho.id,
    //            tratamentoTipo: tratamentoTipo,
    //            funcionarioId: this.espelho.funcionarioId,
    //            funcionarioNome: this.espelho.funcionarioNome,
    //            expediente: this.espelho.expediente.descricaoHora,
    //            dia: `${this.espelho.dia} ${this.espelho.diaSemana.substring(0, 3)}`
    //        }
    //    })

    //    modal.afterClose.subscribe((result: EspelhoDia[] | null) => { if (result) this.onEspelhoUpdate.emit(result) });
    //}

    //solicitacaoOpen(solicitacaoTipo: TSolicitacaoGrupoTipo) {
    //    let modal = this.modalService.create({
    //        nzContent: TratamentoSolicitacaoModalComponent,
    //        nzWidth: 570,
    //        nzClosable: false,
    //        nzFooter: null,
    //        nzData: {
    //            apontamentoId: <number>this.espelho.id,
    //            tipo: solicitacaoTipo,
    //            funcionarioId: this.espelho.funcionarioId,
    //            funcionarioNome: this.espelho.funcionarioNome,
    //            expediente: this.espelho.expediente.descricaoHora,
    //            dia: `${this.espelho.dia} ${this.espelho.diaSemana.substring(0, 3)}`
    //        }
    //    })

    //    modal.afterClose.subscribe((result: EspelhoDia[] | null) => { if (result) this.onEspelhoUpdate.emit(result) });
    //}

    //expedienteDiaOpen(data: string | null) {
    //    const modal = this.modalService.create({
    //        nzContent: FuncionarioExpedienteModalComponent,
    //        nzWidth: 460,
    //        nzClosable: false,
    //        nzFooter: null,
    //        nzData: {
    //            funcionarioId: <number>this.espelho.funcionarioId,
    //            data: this.dateUtilsService.convertIsoStringToDate(<string>data),
    //            apontamentoId: this.espelho.id
    //        }
    //    })

    //    modal.afterClose.subscribe(r => { if (r) this.updateRow(r) })
    //}

    //updateRow(e: EspelhoDia) {
    //    this.espelho = e
    //}

    getEncryptedId(id: number | undefined): string {
        return this.encryptionService.encrypt(<number>id);
    }

    getEncryptedData(data: string | null): string {
        return this.encryptionService.encrypt(data);
    }

    //diaIconeCss(espelho: EspelhoDia): string {
    //    if (espelho.feriasDescricao) return "bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white"
    //    if (espelho.afastamentoDescricao) return "bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white"
    //    if (espelho.feriadoDescricao) return "bg-red-200 dark:bg-red-800 text-black dark:text-white"
    //    if (espelho.calculos.folga) return "bg-gray-200 dark:bg-gray-500 text-black dark:text-white"
    //    return "bg-blue-200 dark:bg-blue-800 text-black dark:text-white"
    //}

    //diaCss(espelho: EspelhoDia): string {
    //    if (espelho.feriadoDescricao) return "text-red-800 dark:text-red-400"
    //    if (espelho.calculos.folga) return "text-gray-500 dark:text-gray-500"
    //    return ""
    //}

    get isDebug(): boolean {
        return environment.debug;
    }

    //getGrupos(): SolicitacaoGrupo[] | undefined {
    //    return this.pontoTimelineUtilsService.getGrupos(this.espelho)
    //}

    commented(e: any) {
        if (!this.obrigacao.comments) this.obrigacao.comments = [];

        this.obrigacao.comments.push(e);
    }

    evaluated() {
        //    this.espelhosService.espelhoByIdGet(this.espelho.id!).subscribe(x => {
        //        console.log(['this.espelho', this.espelho])
        //        this.espelho = x.obj
        //    })
    }

    commentsCommented(e: CommentPageItem) {
        // se aceitou a solicitação, recarrega o espelho do dia
        //if (e.solicitacao?.status == TSolicitacaoStatus.Aceito || e.solicitacao?.status == TSolicitacaoStatus.Rejeitado) {
        //    this.espelhosService.espelhoByIdGet(<number>e.origemId).subscribe(x => {
        //        this.espelho = x.obj
        //    })
        //}
        //    if (e.solicitacaoStatus == TSolicitacaoStatus.Aceito || e.solicitacaoStatus == TSolicitacaoStatus.Rejeitado) {
        //        this.espelhosService.espelhoByIdGet(<number>e.origemId).subscribe(x => {
        //            this.espelho = x.obj
        //        })
        //    }
    }

    //solicitacaoOpened(e: SolicitacaoGrupo) {
    //    this.solicitacaoOpen(e.tipo)
    //}

    postCommented(e: any) {
        if (!this.obrigacao.comments) this.obrigacao.comments = [];

        this.obrigacao.comments.push(e);
    }

    //ngAfterViewInit() {
    //    if (this.focused) {
    //        setTimeout(() => this.timeline.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500);
    //    }
    //}

    postCommentsClick() {
        this.timelinesService.commentsByOrigemId(<number>this.obrigacao.id, TPostTipo.ContabilObrigacao).subscribe((x) => {
            this.obrigacao.comments = x.obj;
        });
    }

    commentResposta(status: any) {
        console.log(status);
    }

    //    getParameter(): AvatarImageEsferaParameter {
    //        return {
    //            esfera: this.obrigacao.esfera,
    //            uf: this.obrigacao.uf,
    //            municipioCodigo: this.obrigacao.municipioCodigo
    //        }
    //    }

    getData(obrigacaoClientePeriodoId: number) {
        this.obrigacoesService.obrigacaoClientePeriodoPageItemGet(obrigacaoClientePeriodoId).subscribe((x) => {
            this.title = x.obj.clienteNomeFormat;
            this.subTitle = x.obj.obrigacaoDescricaoFormat;
            this.obrigacao = x.obj;
        });
    }

    //triggerBlink() {
    //    this.blinkDirective.triggerBlink();
    //}

    getUserIds(users: ObrigacaoClientePeriodoUserPageItem[]): number[] {
        return users.map((x) => x.userId);
    }

    getUserNomes(users: ObrigacaoClientePeriodoUserPageItem[]): string[] {
        return users.map((x) => x.userNomeFormat);
    }

    getStatusIcon(): string | undefined {
        switch (this.obrigacao.status) {
            case TObrigacaoStatus.ConcluidoForadoPrazo:
                return 'bootstrapExclamationLg';
            case TObrigacaoStatus.ConcluidoNoPrazo:
                return 'ionCheckmarkSharp';
        }

        return undefined;
    }

    getStatusDescricaoClass(): string {
        var result = 'p-[8px]';

        switch (this.obrigacao.status) {
            case TObrigacaoStatus.ConcluidoForadoPrazo:
                result += ' bg-yellow-200 dark:bg-yellow-700';
                break;
            case TObrigacaoStatus.ConcluidoNoPrazo:
                result += ' bg-blue-200 dark:bg-blue-700';
                break;
            case TObrigacaoStatus.EmAberto:
                result += ' bg-zinc-200 dark:bg-zinc-700';
                break;
        }

        return result;
    }
}
