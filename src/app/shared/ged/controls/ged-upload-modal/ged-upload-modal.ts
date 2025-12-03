import { CommonModule } from '@angular/common';
import { Component, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { AlertType } from 'src/app/shared/controls/alert/alert';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { InputFileComponent } from 'src/app/shared/controls/input-file/input-file';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { LabelTextComponent } from 'src/app/shared/controls/label-text/label-text';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { DateUtilsService } from 'src/app/shared/services';
import { PastaView } from '../../models/views';
import { GedService } from '../../services/ged.service';

export interface GedUploadModalData {
    cadastroId: number;
    pastaId: number;
}

@Component({
    selector: 'ged-upload-modal',
    templateUrl: './ged-upload-modal.html',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalBaseComponent,
        InputFileComponent,
        InputTextAreaExComponent,
        ButtonDefaultComponent,
        LabelTextComponent,
    ],
})
export class GedUploadModalComponent extends ModalBaseComponent {
    AlertType = AlertType;

    firstFormGroup: FormGroup;

    files: File[] = [];

    submitting = false;

    cadastroId: number;
    pasta?: PastaView;

    constructor(
        private formBuilder: FormBuilder,
        injector: Injector,
        private modalService: NzModalService,
        private gedService: GedService,
        private dateUtilsService: DateUtilsService,
        @Inject(NZ_MODAL_DATA) data: GedUploadModalData,
    ) {
        super(injector);
        this.cadastroId = data.cadastroId;
        this.getData(data.pastaId);
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            comentario: [''],
        });
    }

    fileSelected(e: any) {
        this.files = e;
    }

    submit() {
        if (this.submitting) return;

        this.submitting = true;

        const comentario = this.firstFormGroup.get('comentario')?.value;
        const competencia = this.dateUtilsService.firstDateOfCurrentMonth();

        this.gedService.arquivoGenericoUpload(this.cadastroId, competencia, undefined, this.pasta?.id!, this.files, comentario).subscribe((x) => {
            this.submitting = false;
            this.closeModal();
        });
    }

    getData(pastaId: number) {
        this.gedService.pastaPropertiesGet(pastaId).subscribe((x) => {
            this.pasta = x.obj;
            this.createForm();
        });
    }
}
