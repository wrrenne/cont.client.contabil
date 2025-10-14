import { Component, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { UserClienteInput } from '../../../models/users/inputs';
import { ContabilUsersService } from '../../services/contabilUsers.service';
import { UserSelectComponent } from '../user-select/user-select';

export interface ClienteUserAssociarModalData {
    clienteId: number;
    clienteNome: string;
}

@Component({
    selector: 'cliente-user-associar-modal',
    standalone: true,
    templateUrl: './cliente-user-associar-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, UserSelectComponent, InputTextAreaExComponent],
})
export class ClienteUserAssociarModalComponent extends ModalBaseComponent {
    firstFormGroup: FormGroup;

    clienteId: number;

    constructor(
        injector: Injector,
        private _formBuilder: FormBuilder,
        private dateUtilsService: DateUtilsService,
        @Inject(NZ_MODAL_DATA) data: ClienteUserAssociarModalData,
        private contabilUsersService: ContabilUsersService,
        private vars: Vars,
    ) {
        super(injector);

        this.clienteId = data.clienteId;
        this.title = data.clienteNome;
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.firstFormGroup = this._formBuilder.group({
            userId: [null, Validators.required],
            comentario: [null],
            //competenciaInicial: [null, Validators.required],
        });
    }

    submitClick() {
        if (this.clienteId) {
            const input: UserClienteInput = {
                cadastroId: this.vars.cadastro?.id!,
                clienteId: this.clienteId,
                //mesInicial: this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.firstFormGroup.get('competenciaInicial')?.value)),
                mesInicial: '2000-01-01',
                userId: this.firstFormGroup.get('userId')?.value,
                departamentoId: undefined,
            };

            this.contabilUsersService.userClienteAdd(input).subscribe((x) => {
                this.closeModal(x.obj[0]);
                this.firstFormGroup.reset();
            });
        }
    }
}
