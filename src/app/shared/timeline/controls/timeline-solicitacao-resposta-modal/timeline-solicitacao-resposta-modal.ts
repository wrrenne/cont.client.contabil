import { CommonModule } from '@angular/common';
import { Component, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { CommentPageItem } from '../../../../shared/timeline/models/pagings';
import { TimelinesService } from '../../../../shared/timeline/services/timelines.service';
import { InputFileComponent } from '../../../controls/input-file/input-file';
import { InputTextAreaExComponent } from '../../../controls/input-textarea-ex/input-textarea-ex';
import { FirstWordPipe } from '../../../pipes/firstWord.pipe';
import { TSolicitacaoStatus } from '../../enums';
import { NewCommentParameter, TimelineCommentFormParameter } from '../../models/parameters';
import { SolicitacaoRespostaInput } from '../../models/inputs';
import { Vars } from '../../../variables';

export interface TimelineSolicitacaoRespostaData {
    commentId: number
    solicitacaoId: number
    solicitacaoStatus: TSolicitacaoStatus
    funcionarioNome: string
    cargoDescricao: string
}

@Component({
    selector: 'timeline-solicitacao-resposta-modal',
    templateUrl: './timeline-solicitacao-resposta-modal.html',
    standalone: true,
    providers: [FirstWordPipe],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalBaseComponent, InputTextAreaExComponent, InputFileComponent]
})
export class TimelineSolicitacaoRespostaModalComponent extends ModalBaseComponent {

    TSolicitacaoStatus = TSolicitacaoStatus

    formComment: FormGroup

    newComment: NewCommentParameter

    status: TSolicitacaoStatus
    newCommentTitle: string
    postarLabel?: string
    files: File[]
    comentarComoLabel: string

    constructor(
        private timelinesService: TimelinesService,
        injector: Injector,
        private formBuilder: FormBuilder,
        @Inject(NZ_MODAL_DATA) data: TimelineSolicitacaoRespostaData,
        private firstWordPipe: FirstWordPipe,
        private vars: Vars
    ) {
        super(injector)

        this.title = data.funcionarioNome
        this.subTitle = data.cargoDescricao

        this.status = data.solicitacaoStatus
        this.newComment = { commentId: data.commentId, solicitacaoId: data.solicitacaoId, commentUserNome: data.funcionarioNome, solicitacaoStatus: data.solicitacaoStatus }
        this.newCommentTitle = `Você está ${data.solicitacaoStatus == TSolicitacaoStatus.Aceito ? 'aceitando' : 'rejeitando'} a solicitação de ${this.firstWordPipe.transform(this.newComment?.commentUserNome!)}`
        this.postarLabel = data.solicitacaoStatus == TSolicitacaoStatus.Aceito ? 'Aceitar Solicitação' : 'Rejeitar'
        this.comentarComoLabel = `Avaliar como ${this.firstWordPipe.transform(this.vars.user?.nome!)}`

        this.createForm()
    }

    evaluated(e: any) {
        this.closeModal(true)
    }

    solicitacaoRespostaSubmit(): void {
        const input: SolicitacaoRespostaInput =
        {
            solicitacaoId: <number>this.newComment?.solicitacaoId,
            commentId: <number>this.newComment?.commentId,
            userId: <number>this.vars.user?.id,
            status: this.newComment.solicitacaoStatus,
            texto: this.formComment.get('comentario')?.value
        }

        this.timelinesService.solicitacaoRespostaCreate(input).subscribe(x => {
            this.closeModal(true)
        });
    }

    createForm() {
        this.formComment = this.formBuilder.group({
            comentario: [null],
        })
    }

    onCommentFileSelected(e: any) {
        this.files = e
    }
}
