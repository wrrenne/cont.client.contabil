import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { AlertComponent } from 'src/app/shared/controls/alert/alert';
import { InputFileComponent } from 'src/app/shared/controls/input-file/input-file';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { LabelTextComponent } from 'src/app/shared/controls/label-text/label-text';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { ObrigacaoClientePeriodoView } from '../../../models/obrigacoes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';

export interface ObrigacaoConclusaoModalData {
    obrigacaoClientePeriodoId: number;
}

@Component({
    selector: 'obrigacao-conclusao-modal',
    templateUrl: './obrigacao-conclusao-modal.html',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalBaseComponent,
        InputFileComponent,
        InputTextAreaExComponent,
        AlertComponent,
        LabelTextComponent,
    ],
})
export class ObrigacaoConclusaoModalComponent {
    firstFormGroup: FormGroup;

    obrigacaoClientePeriodo: ObrigacaoClientePeriodoView;
    files: File[] = [];

    constructor(
        private modal: NzModalRef,
        private formBuilder: FormBuilder,
        private obrigacoesService: ObrigacoesService,
        @Inject(NZ_MODAL_DATA) data: ObrigacaoConclusaoModalData,
    ) {
        this.getData(data.obrigacaoClientePeriodoId);
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            comentario: [''],
            gedPastaCodigo: [this.obrigacaoClientePeriodo.gedPastaCodigo, Validators.required],
        });
    }

    fileSelected(e: any) {
        this.files = e;
    }

    submit() {
        const comentario = this.firstFormGroup.get('comentario')?.value;
        const gedPastaCodigo = this.firstFormGroup.get('gedPastaCodigo')?.value;

        this.obrigacoesService.obrigacaoConclusao(this.obrigacaoClientePeriodo.id!, comentario, gedPastaCodigo, this.files).subscribe((x) => {
            this.closeModal(x.obj[0]);
            this.firstFormGroup.reset();
        });
    }

    closeModal(o?: any) {
        if (o) this.modal.close(o);
        else this.modal.close();
    }

    getData(obrigacaoClientePeriodoId: number) {
        this.obrigacoesService.obrigacaoClientePeriodoGet(obrigacaoClientePeriodoId).subscribe((x) => {
            this.obrigacaoClientePeriodo = x.obj;

            this.createForm();
        });
    }
}
