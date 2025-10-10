import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { PerfilInput } from '../../../models/obrigacoes/inputs';
import { PerfisParameter } from '../../../models/obrigacoes/parameters';
import { PerfisService } from '../../services/perfis.service';

@Component({
    selector: 'perfil-novo-modal',
    templateUrl: './perfil-novo-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, InputExComponent, InputTextAreaExComponent],
})
export class PerfilNovoModalComponent {
    firstFormGroup: FormGroup;

    parameters: PerfisParameter;

    perfilItemId: number;

    constructor(
        private modal: NzModalRef,
        private formBuilder: FormBuilder,
        private dateUtilsService: DateUtilsService,
        private vars: Vars,
        private perfisService: PerfisService,
        //@Inject(NZ_MODAL_DATA) data: PerfilClienteAssociarModalData
    ) {
        this.parameters = { cadastroId: vars.cadastro?.id! };
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            descricao: [null, Validators.required],
            comentario: [''],
        });
    }

    submit() {
        const input: PerfilInput = {
            cadastroId: this.vars.cadastro?.id!,
            userId: this.vars.user?.id!,
            descricao: this.firstFormGroup.get('descricao')?.value,
            comentario: this.firstFormGroup.get('comentario')?.value,
        };

        this.perfisService.perfilCreateOrUpdate(input).subscribe((x) => {
            this.closeModal(x.obj[0]);
            this.firstFormGroup.reset();
        });
    }

    closeModal(o?: any) {
        if (o) this.modal.close(o);
        else this.modal.close();
    }
}
