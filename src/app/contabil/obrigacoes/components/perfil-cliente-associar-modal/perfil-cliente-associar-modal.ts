import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { ClienteSelectComponent } from 'src/app/contabil/clientes/components/cliente-select/cliente-select';
import { InputMonthYearExComponent } from 'src/app/shared/controls/input-month-year-ex/input-month-year-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { PerfilClienteInput } from '../../../models/obrigacoes/inputs';
import { PerfisParameter } from '../../../models/obrigacoes/parameters';
import { PerfisService } from '../../services/perfis.service';

export interface PerfilClienteAssociarModalData {
    perfilItemId: number;
}

@Component({
    selector: 'perfil-cliente-associar-modal',
    templateUrl: './perfil-cliente-associar-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, ClienteSelectComponent, InputMonthYearExComponent, InputTextAreaExComponent, NgIcon],
})
export class PerfilClienteAssociarModalComponent {
    firstFormGroup: FormGroup;

    parameters: PerfisParameter;

    perfilItemId: number;

    constructor(
        private modal: NzModalRef,
        private formBuilder: FormBuilder,
        private dateUtilsService: DateUtilsService,
        private vars: Vars,
        private perfisService: PerfisService,
        @Inject(NZ_MODAL_DATA) data: PerfilClienteAssociarModalData,
    ) {
        this.perfilItemId = data.perfilItemId;
        this.parameters = { cadastroId: vars.cadastro?.id! };
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            clienteId: [null, Validators.required],
            competenciaInicial: [null, Validators.required],
            comentario: [''],
        });
    }

    submit() {
        const input: PerfilClienteInput = {
            cadastroId: this.vars.cadastro?.id!,
            perfilItemId: this.perfilItemId,
            competenciaInicial: this.dateUtilsService.GetDateIsoString(
                this.dateUtilsService.firstDateOfMonth(this.firstFormGroup.get('competenciaInicial')?.value),
            ),
            clienteId: this.firstFormGroup.get('clienteId')?.value,
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
