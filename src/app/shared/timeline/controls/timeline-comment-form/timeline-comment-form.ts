import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { environment } from '../../../../../environments/environment';
import { Vars } from '../../../../shared/variables';
import { fadeInAnimation } from '../../../animations';
import { HyperlinkButtonComponent } from '../../../controls/hyperlink-button/hyperlink-button';
import { InputFileComponent } from '../../../controls/input-file/input-file';
import { InputTextAreaExComponent } from '../../../controls/input-textarea-ex/input-textarea-ex';
import { GedService } from '../../../ged/services/ged.service';
import { SistemaTipo } from '../../../models';
import { FirstWordPipe } from '../../../pipes';
import { DateUtilsService, StringsService } from '../../../services';
import { TPostTipo, TSolicitacaoStatus } from '../../enums';
import { SolicitacaoGrupo } from '../../models';
import { CommentInput, SolicitacaoRespostaInput } from '../../models/inputs';
import { SolicitacaoRespostaOutput } from '../../models/outputs';
import { NewCommentParameter, TimelineCommentFormParameter } from '../../models/parameters';
import { TimelinesService } from '../../services/timelines.service';

@Component({
    selector: 'timeline-comment-form',
    templateUrl: './timeline-comment-form.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzModalModule, NgIcon, HyperlinkButtonComponent, InputTextAreaExComponent, InputFileComponent],
    providers: [FirstWordPipe],
    animations: [fadeInAnimation],
})
export class TimelineCommentFormComponent implements OnInit {
    formComment: FormGroup;

    private _parameter: TimelineCommentFormParameter;
    @Input() get parameter() {
        return this._parameter;
    }
    set parameter(value: TimelineCommentFormParameter) {
        this._parameter = value;
    }

    private _newComment: NewCommentParameter | undefined;
    @Input() get newComment() {
        return this._newComment;
    }
    set newComment(value: NewCommentParameter | undefined) {
        if (!value) return;

        this._newComment = value;
        if (this.openComment == undefined) this.openComment = false;

        if (value.solicitacaoId) this.openCloseSolicitacaoRespostaClick(value.solicitacaoStatus!);
        else this.openCloseRespostaClick();
    }

    newCommentTitle: string;

    @Output() onNewCommentClick = new EventEmitter<NewCommentParameter>();
    @Output() onEvaluated = new EventEmitter<SolicitacaoRespostaOutput>();
    @Output() onCommented = new EventEmitter<number>();

    TSolicitacaoStatus = TSolicitacaoStatus;

    files: File[];

    postarLabel?: string;
    placeholderLabel?: string;

    private _openComment: boolean;
    get openComment() {
        return this._openComment;
    }
    set openComment(value: boolean) {
        this._openComment = value;

        //if (value)
        //    setTimeout(() => this.comentario.nativeElement.focus(), 0);
    }

    //@ViewChild('comentario') comentario: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private timelinesService: TimelinesService,
        private stringsService: StringsService,
        private vars: Vars,
        private gedService: GedService,
        private firstWordPipe: FirstWordPipe,
        private dateUtilsService: DateUtilsService,
    ) {}

    //createForm() {
    //    this.openComment = false
    //}

    ngOnInit(): void {
        //this.createForm()
    }

    submit(): void {
        if (this.formComment.get('solicitacaoStatus')?.value) {
            this.solicitacaoRespostaSubmit();
        } else {
            this.commentSubmit();
        }
    }

    commentSubmit(): void {
        const input: CommentInput = {
            cadastroId: this.vars.cadastro?.id!,
            funcionarioId: this.parameter.funcionarioId,
            postClienteId: this.parameter.clienteId,
            sistemaId: environment.sistema,
            texto: this.formComment.get('comentario')?.value,
            userId: <number>this.vars.user?.id,
            postId: this.parameter.postId,
            origemId: this.parameter.origemId,
            commentId: <number>this.newComment?.commentId,
            ponto_ApontamentoData:
                this.parameter.ponto_ApontamentoData != undefined ? this.dateUtilsService.GetIsoString(this.parameter.ponto_ApontamentoData) : undefined,
            contabil_ObrigacaoNome: this.parameter.contabil_ObrigacaoNome,
            contabil_Prazo: this.parameter.contabil_Prazo != undefined ? this.dateUtilsService.GetIsoString(this.parameter.contabil_Prazo) : undefined,

            isFuncionario: environment.sistema == SistemaTipo.Funcionario ? this.vars.funcionario != undefined : undefined,
            isCliente: environment.sistema == SistemaTipo.Contabil ? false : undefined,

            temArquivo: this.files?.length > 0,
        };

        this.timelinesService.commentCreate(input, <TPostTipo>this.parameter.tipo).subscribe((x) => {
            if (this.files?.length) {
                switch (this.parameter.tipo) {
                    case TPostTipo.Ponto:
                        this.gedService
                            .arquivoTipoApontamentoUpload(
                                this.parameter.funcionarioId!,
                                this.parameter.origemId!,
                                this.dateUtilsService.GetIsoString(this.parameter.ponto_ApontamentoData!),
                                x.obj[0],
                                this.files,
                            )
                            .subscribe((_) => {
                                this.openComment = false;
                                this.formComment.reset();
                                this.onCommented.emit(x.obj[0]);
                            });
                        break;
                    case TPostTipo.ContabilObrigacao:
                        this.gedService
                            .arquivoTipoObrigacaoUpload(
                                this.parameter.clienteId!,
                                this.parameter.origemId!,
                                this.parameter.contabil_Prazo!,
                                this.parameter.contabil_Vencimento,
                                this.parameter.contabil_CompetenciaMes,
                                this.parameter.contabil_CompetenciaAno,
                                x.obj[0],
                                this.files,
                            )
                            .subscribe((_) => {
                                this.openComment = false;
                                this.formComment.reset();
                                this.onCommented.emit(x.obj[0]);
                            });
                }
            } else {
                this.openComment = false;
                this.formComment.reset();
                this.onCommented.emit(x.obj[0]);
            }
        });
    }

    solicitacaoRespostaSubmit(): void {
        const input: SolicitacaoRespostaInput = {
            solicitacaoId: <number>this.newComment?.solicitacaoId,
            commentId: <number>this.newComment?.commentId,
            userId: <number>this.vars.user?.id,
            status: this.formComment.get('solicitacaoStatus')?.value,
            texto: this.formComment.get('comentario')?.value,
        };

        this.timelinesService.solicitacaoRespostaCreate(input).subscribe((x) => {
            this.openComment = false;
            this.formComment.reset();
            this.onEvaluated.emit(x.obj[0]);
        });
    }

    openCloseCommentClick() {
        if (!this.openComment) {
            this.postarLabel = undefined;
            this.placeholderLabel = undefined;

            this.formComment = this.formBuilder.group({
                comentario: ['', Validators.required],
                solicitacaoStatus: [null],
            });
        }

        this.openComment = !this.openComment;
    }

    openCloseSolicitacaoClick(solicitacaoGrupo: SolicitacaoGrupo) {
        //this.onSolicitacaoOpened.emit(solicitacaoGrupo)
    }

    respostaClick() {
        this.onNewCommentClick.emit({ commentId: this.parameter.commentId!, commentUserNome: this.parameter.userNome! });
    }

    solicitacaoRespostaClick(solicitacaoStatus: TSolicitacaoStatus) {
        this.onNewCommentClick.emit({
            solicitacaoId: this.parameter.solicitacao?.id,
            solicitacaoStatus: solicitacaoStatus,
            commentId: this.parameter.commentId!,
            commentUserNome: this.parameter.userNome!,
        });
    }

    openCloseRespostaClick() {
        if (!this.openComment) {
            this.postarLabel = undefined;
            this.placeholderLabel = undefined;

            if (this.newComment?.commentId) this.newCommentTitle = `Você está respondendo a ${this.firstWordPipe.transform(this.newComment?.commentUserNome!)}`;
            else
                this.newCommentTitle = `Você comentando o ponto do dia ${this.dateUtilsService.getDateDDMM(new Date(this.parameter.ponto_ApontamentoData!))} de ${this.firstWordPipe.transform(this.newComment?.funcionarioNome!)}`;

            this.formComment = this.formBuilder.group({
                comentario: ['', Validators.required],
                solicitacaoStatus: [null],
            });
        }

        this.openComment = !this.openComment;
    }

    openCloseSolicitacaoRespostaClick(solicitacaoStatus: TSolicitacaoStatus) {
        if (!this.openComment) {
            this.postarLabel = solicitacaoStatus == TSolicitacaoStatus.Aceito ? 'Aceitar Solicitação' : 'Rejeitar';
            this.placeholderLabel = 'Comentário';

            this.newCommentTitle = `Você está ${solicitacaoStatus == TSolicitacaoStatus.Aceito ? 'aceitando' : 'rejeitando'} a solicitação de ${this.firstWordPipe.transform(this.newComment?.commentUserNome!)}`;

            this.formComment = this.formBuilder.group({
                comentario: [''],
                solicitacaoStatus: [solicitacaoStatus],
            });
        }

        this.openComment = !this.openComment;
    }

    trackById(index: any, tipo: any) {
        return tipo.id;
    }

    get isFuncionario() {
        return this.vars.funcionario != null;
    }

    getUserId(): number {
        return this.vars.user?.id!;
    }

    getComentarComo(): string {
        return `${this.formComment.get('solicitacaoStatus')?.value ? 'Avaliar' : 'Comentar'} como ${this.stringsService.firstWord(this.vars.user?.nome!)}`;
    }

    postCancel() {
        this.openComment = false;
    }

    onCommentFileSelected(e: any) {
        this.files = e;
    }

    //showCommentsClick() {
    //    if (this.showOpenCommentsButton) {
    //        this.showComments()
    //    }
    //}

    // showComments(openComentar: boolean) {
    //     const modal = this.modalService.create({
    //         nzContent: TimelineCommentsModalComponent,
    //         nzWidth: 570,
    //         nzClosable: false,
    //         nzFooter: null,
    //         nzData: {
    //             parameter: this.parameter,
    //             focusNewComment: true,
    //             newComment: openComentar ? { commentUserNome: this.vars.user?.nome } : undefined,
    //         },
    //     });

    //     //    this.timelinesService.commentsByOrigemId(this.parameter.postInfo?.origemId!, this.parameter.tipo!).subscribe(x => {
    //     //        this.comments = x.obj
    //     //    })
    // }
}

export class TimelineCommentButton {
    public label: string;
    public icon?: string;
    public handler?: Handler;
}

type Handler = () => void;
