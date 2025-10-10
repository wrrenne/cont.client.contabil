import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { environment } from '../../../../../environments/environment.prod';
import { UserInput } from '../../../../shared/control/models/inputs';
import { UsersService } from '../../../../shared/control/services/users.service';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';

@Component({
    selector: 'user-novo-modal',
    standalone: true,
    templateUrl: './user-novo-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, InputExComponent],
})
export class UserNovoModalComponent {
    showSecondForm = false;

    firstFormGroup: FormGroup;

    constructor(
        private modal: NzModalRef,
        private router: Router,
        private formBuilder: FormBuilder,
        private vars: Vars,
        private usersService: UsersService,
        private encryptionService: EncryptionService,
        private notification: NzNotificationService,
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            nome: [null, Validators.required],
            email: [null, Validators.required],
        });
    }

    closeModal() {
        this.modal.close();
    }

    submit() {
        var userInput: UserInput = {
            nome: this.firstFormGroup.get('nome')?.value,
            email: this.firstFormGroup.get('email')?.value,
            sistemaId: environment.sistema,
            cadastroId: this.vars.cadastro?.id!,
            master: false,
            supervisor: false,
            sendInvite: false,
        };

        this.usersService.userCreateOrUpdate(userInput).subscribe((x) => {
            if (x.errorMessage != null) {
                this.createNotificationError(x.errorMessage.text);
                return;
            }

            this.createNotificationUserSucesso();
            this.router.navigate(['/sistema/users/user', this.getEncryptedId(x.obj[0])]);
            this.closeModal();
        });
    }

    //tratamentoGo() {
    //    this.router.navigate(['/sistema/espelhos/fechamento']);
    //}

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    createNotificationUserSucesso(): void {
        this.notification.create('success', '', 'Registro criado com sucesso');
    }

    createNotificationError(erro: string): void {
        this.notification.create('', 'Usuário', erro);
    }
}
