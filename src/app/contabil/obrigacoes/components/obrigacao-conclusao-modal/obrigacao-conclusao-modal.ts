import { CommonModule } from '@angular/common';
import { Component, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { AlertComponent, AlertType } from 'src/app/shared/controls/alert/alert';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
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
        ButtonDefaultComponent,
    ],
})
export class ObrigacaoConclusaoModalComponent extends ModalBaseComponent {
    AlertType = AlertType;

    firstFormGroup: FormGroup;

    obrigacaoClientePeriodo: ObrigacaoClientePeriodoView;
    files: File[] = [];

    submitting = false;

    constructor(
        private formBuilder: FormBuilder,
        private obrigacoesService: ObrigacoesService,
        injector: Injector,
        @Inject(NZ_MODAL_DATA) data: ObrigacaoConclusaoModalData,
    ) {
        super(injector);
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
        if (this.submitting) return;

        this.submitting = true;

        const comentario = this.firstFormGroup.get('comentario')?.value;
        const gedPastaCodigo = this.firstFormGroup.get('gedPastaCodigo')?.value;

        this.obrigacoesService.obrigacaoConclusao(this.obrigacaoClientePeriodo.id!, comentario, gedPastaCodigo, this.files).subscribe((x) => {
            this.submitting = false;
            this.closeModal(x.obj[0]);
        });
    }

    getData(obrigacaoClientePeriodoId: number) {
        this.obrigacoesService.obrigacaoClientePeriodoGet(obrigacaoClientePeriodoId).subscribe((x) => {
            this.obrigacaoClientePeriodo = x.obj;

            this.createForm();
        });
    }
}
