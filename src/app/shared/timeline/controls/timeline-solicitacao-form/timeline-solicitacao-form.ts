import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vars } from '../../../../shared/variables';
import { TPostTipo, TSolicitacaoStatus } from '../../enums';
import { SolicitacaoGrupo } from '../../models';
import { SolicitacaoRespostaInput } from '../../models/inputs';
import { SolicitacaoPageItem } from '../../models/pagings/solicitacaoPageItem';
import { TimelinesService } from '../../services/timelines.service';
import { HyperlinkButtonComponent } from '../../../controls/hyperlink-button/hyperlink-button';
import { TextFieldModule } from '@angular/cdk/text-field';


@Component({
    selector: 'timeline-solicitacao-form',
    templateUrl: './timeline-solicitacao-form.html',
    standalone: true,
    imports: [HyperlinkButtonComponent, TextFieldModule],
    host: { 'class': 'w-full' }
})
export class TimelineSolicitacaoFormComponent implements OnInit {

    formComment: FormGroup

    @Input() dataHora?: string
    @Input() postId?: number
    @Input() commentId?: number
    @Input() origemId?: number
    @Input() tipo?: TPostTipo
    @Input() solicitacao: SolicitacaoPageItem
    @Output() onSolicitacaoOpened = new EventEmitter<SolicitacaoGrupo>()

    TSolicitacaoStatus = TSolicitacaoStatus

    @Output() onCommented = new EventEmitter()

    postarLabel?: string
    placeholderLabel?: string

    private _openComment: boolean
    get openComment() {
        return this._openComment
    }
    set openComment(value: boolean) {
        this._openComment = value

        if (value)
            setTimeout(() => this.comentario.nativeElement.focus(), 0);
    }

    @ViewChild('comentario') comentario: ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private timelinesService: TimelinesService,
        private vars: Vars
    ) { }

    createForm() {
        this._openComment = false
    }

    ngOnInit(): void {
        this.createForm()
    }

    submit(): void {
        let status: TSolicitacaoStatus = this.formComment.get('solicitacaoStatus')?.value

        if (!status) status = TSolicitacaoStatus.EmAberto

        const input: SolicitacaoRespostaInput =
        {
            solicitacaoId: <number>this.solicitacao.id,
            commentId: <number>this.commentId,
            userId: <number>this.vars.user?.id,
            status: this.formComment.get('solicitacaoStatus')?.value,
            texto: this.formComment.get('comentario')?.value,
        }

        this.timelinesService.solicitacaoRespostaCreate(input).subscribe(x => {
            this.openComment = false
            this.onCommented.emit()
            this.formComment.reset()
        });
    }

    openCloseCommentClick() {
        if (!this.openComment) {
            this.postarLabel = undefined
            this.placeholderLabel = undefined

            this.formComment = this.formBuilder.group({
                comentario: ['', Validators.required],
                status: [null]
            })
        }

        this.openComment = !this.openComment
    }

    openCloseSolicitacaoRespostaClick(solicitacaoStatus: TSolicitacaoStatus) {
        if (!this.openComment) {
            this.postarLabel = solicitacaoStatus == TSolicitacaoStatus.Aceito ? 'Aceitar Solicitação' : 'Rejeitar'
            this.placeholderLabel = 'Comentário opcional'

            this.formComment = this.formBuilder.group({
                comentario: [''],
                solicitacaoTipo: [null],
                solicitacaoStatus: [solicitacaoStatus]
            })
        }

        this.openComment = !this.openComment
    }

    trackById(index: any, tipo: any) {
        return tipo.id;
    }
}
