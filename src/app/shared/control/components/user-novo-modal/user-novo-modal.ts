
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../../../environments/environment';
import { UserInput } from '../../../../shared/control/models/inputs';
import { UsersService } from '../../../../shared/control/services/users.service';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { InputExComponent } from '../../../controls/input-ex/input-ex';
import { ModalBaseComponent } from '../../../controls/modal-base/modal-base';

export interface UserNovoModalData {
    cadastroId: number
}

@Component({
    selector: 'user-novo-modal',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, InputExComponent],
    templateUrl: './user-novo-modal.html'
})
export class UserNovoModalComponent {

    showSecondForm = false

    firstFormGroup: FormGroup
    secondFormGroup: FormGroup

    cadastroId?: number

    constructor(
        private modal: NzModalRef,
        private router: Router,
        private formBuilder: FormBuilder,
        private vars: Vars,
        private usersService: UsersService,
        private encryptionService: EncryptionService,
        private notification: NzNotificationService,
        @Inject(NZ_MODAL_DATA) data: UserNovoModalData
    ) {
        this.cadastroId = data?.cadastroId
    }

    ngOnInit(): void {
        this.createForm()
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            email: [null, Validators.required],
        });

        this.secondFormGroup = this.formBuilder.group({
            email: [null, Validators.required],
            nome: [null, Validators.required],
            sistemaId: [environment.sistema, Validators.required],
        });
    }


    closeModal() {
        this.modal.close();
    }

    emailPesquisar() {
        const email = this.firstFormGroup.get('email')?.value

        this.secondFormGroup.controls['email'].setValue(email)

        this.usersService.userByEmailGet(email).subscribe(x => {
            if (x.obj) {
                this.secondFormGroup.controls['nome'].setValue(x.obj.userNome)
            }

            this.showSecondForm = true
        })
    }

    submit() {
        var userInput: UserInput =
        {
            nome: this.secondFormGroup.get('nome')?.value,
            email: this.secondFormGroup.get('email')?.value,
            sistemaId: environment.sistema,
            cadastroId: this.cadastroId,
            userId: this.vars.user?.id,
            master: false,
            supervisor: false
        }

        this.usersService.userCreateOrUpdate(userInput).subscribe(x => {
            if (x.errorMessage != null) {
                this.createNotificationError(x.errorMessage.text)
                return;
            }

            this.createNotificationUserSucesso()
            this.router.navigate(['/sistema/users/user', this.getEncryptedId(x.obj[0])]);
            this.closeModal()
        })
    }

    //tratamentoGo() {
    //    this.router.navigate(['/sistema/espelhos/fechamento']);
    //}

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id)
        //    return this.encryptionService.set(id)
    }

    createNotificationUserSucesso(): void {
        this.notification.create(
            'success',
            '',
            'Registro criado com sucesso'
        );
    }

    createNotificationError(erro: string): void {
        this.notification.create(
            '',
            'Usuário',
            erro
        );
    }
}
