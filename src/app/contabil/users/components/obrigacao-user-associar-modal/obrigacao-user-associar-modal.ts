import { Component, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { UserObrigacaoInput } from 'src/app/contabil/models/users/inputs';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ContabilUsersService } from '../../services/contabilUsers.service';
import { UserSelectComponent } from '../user-select/user-select';

export interface ObrigacaoUserAssociarModalData {
    obrigacaoId: number;
    obrigacaoNome: string;
}

@Component({
    selector: 'obrigacao-user-associar-modal',
    standalone: true,
    templateUrl: './obrigacao-user-associar-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, UserSelectComponent, InputTextAreaExComponent],
})
export class ObrigacaoUserAssociarModalComponent extends ModalBaseComponent {
    firstFormGroup: FormGroup;

    obrigacaoId: number;

    constructor(
        injector: Injector,
        private _formBuilder: FormBuilder,
        private dateUtilsService: DateUtilsService,
        @Inject(NZ_MODAL_DATA) data: ObrigacaoUserAssociarModalData,
        private contabilUsersService: ContabilUsersService,
        private vars: Vars,
    ) {
        super(injector);

        this.obrigacaoId = data.obrigacaoId;
        this.title = data.obrigacaoNome;
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
        if (this.obrigacaoId) {
            const input: UserObrigacaoInput = {
                cadastroId: this.vars.cadastro?.id!,
                obrigacaoId: this.obrigacaoId,
                //mesInicial: this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.firstFormGroup.get('competenciaInicial')?.value)),
                mesInicial: '2000-01-01',
                userId: this.firstFormGroup.get('userId')?.value,
            };

            this.contabilUsersService.userObrigacaoAdd(input).subscribe((x) => {
                this.closeModal(x.obj[0]);
                this.firstFormGroup.reset();
            });
        }
    }
}
