import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { DepartamentoSelectComponent } from 'src/app/contabil/departamentos/componentes/departamento-select/departamento-select';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { DepartamentosService } from '../../../departamentos/services/departamentos.service';
import { UserDepartamentoInput } from '../../../models/contabil/inputs';
import { UserDepartamentoPageItem } from '../../../models/contabil/pageItems';
import { DepartamentosParameter } from '../../../models/contabil/parameters';

export interface UserDepartamentoModal {
    userId: number;
}

@Component({
    selector: 'user-departamento-modal',
    standalone: true,
    templateUrl: './user-departamento-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, DepartamentoSelectComponent, InputTextAreaExComponent],
})
export class UserDepartamentoModalComponent {
    firstFormGroup: FormGroup;

    departamentosParameter: DepartamentosParameter;

    private _userId: number;
    get userId() {
        return this._userId;
    }
    set userId(value: number) {
        this._userId = value;
        this.departamentosParameter = {};
    }

    constructor(
        private modal: NzModalRef,
        private formBuilder: FormBuilder,
        private departamentosService: DepartamentosService,
        private dateUtilsService: DateUtilsService,
        private vars: Vars,
        @Inject(NZ_MODAL_DATA) data: UserDepartamentoModal,
    ) {
        this.userId = data.userId;
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            departamentoId: [null, Validators.required],
            comentario: [null],
        });
    }

    submitClick() {
        const input: UserDepartamentoInput = {
            departamentoId: this.firstFormGroup.get('departamentoId')?.value,
            userId: this.userId,
            porUserId: this.vars.user?.id!,
            comentario: this.firstFormGroup.get('comentario')?.value,
        };

        this.departamentosService.departamentoAddUser(input).subscribe((x) => {
            this.closeModal(x.obj[0]);
            this.firstFormGroup.reset();
        });
    }

    closeModal(o?: UserDepartamentoPageItem) {
        console.log(o);

        if (o != undefined) {
            this.modal.close(o);
        } else {
            this.modal.close();
        }
    }
}
