import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { InputMonthYearExComponent } from 'src/app/shared/controls/input-month-year-ex/input-month-year-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { PerfilClienteInput } from '../../../models/obrigacoes/inputs';
import { PerfisParameter } from '../../../models/obrigacoes/parameters';
import { PerfisService } from '../../services/perfis.service';
import { PerfilSelectComponent } from '../perfil-select/perfil-select.component';

export interface ClientePerfilAssociarModalData {
    clienteId: number;
}

@Component({
    selector: 'cliente-perfil-associar-modal',
    templateUrl: './cliente-perfil-associar-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, PerfilSelectComponent, InputMonthYearExComponent, InputTextAreaExComponent],
})
export class ClientePerfilAssociarModalComponent {
    firstFormGroup: FormGroup;

    parameters: PerfisParameter;

    clienteId: number;

    constructor(
        private modal: NzModalRef,
        private formBuilder: FormBuilder,
        private dateUtilsService: DateUtilsService,
        private vars: Vars,
        private perfisService: PerfisService,
        @Inject(NZ_MODAL_DATA) data: ClientePerfilAssociarModalData,
    ) {
        this.clienteId = data.clienteId;
        this.parameters = { cadastroId: vars.cadastro?.id! };
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            perfilItemId: [null, Validators.required],
            competenciaInicial: [null, Validators.required],
            comentario: [''],
        });
    }

    submit() {
        const input: PerfilClienteInput = {
            cadastroId: this.vars.cadastro?.id!,
            clienteId: this.clienteId,
            competenciaInicial: this.dateUtilsService.GetDateIsoString(
                this.dateUtilsService.firstDateOfMonth(this.firstFormGroup.get('competenciaInicial')?.value),
            ),
            perfilItemId: this.firstFormGroup.get('perfilItemId')?.value,
            userId: this.vars.user?.id!,
            comentario: this.firstFormGroup.get('comentario')?.value,
        };

        this.perfisService.clientePerfilAdd(input).subscribe((x) => {
            this.closeModal(x.obj[0]);
            this.firstFormGroup.reset();
        });
    }

    closeModal(o?: any) {
        if (o) this.modal.close(o);
        else this.modal.close();
    }
}
