import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { environment } from '../../../../../environments/environment.prod';
import { UserInput } from '../../../../shared/control/models/inputs';
import { UsersService } from '../../../../shared/control/services/users.service';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';

@Component({
    selector: 'contabil-user-novo-modal',
    standalone: true,
    templateUrl: './contabil-user-novo-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, InputExComponent, ButtonDefaultComponent, NzCheckboxModule, InputTextAreaExComponent],
})
export class ContabilUserNovoModalComponent {
    showSecondForm = false;

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

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
            email: [null, Validators.required],
        });

        this.secondFormGroup = this.formBuilder.group({
            email: [null, Validators.required],
            nome: [null, Validators.required],
            sistemaId: [environment.sistema, Validators.required],
            sendInvite: [false],
        });
    }

    closeModal() {
        this.modal.close();
    }

    emailPesquisar() {
        const email = this.firstFormGroup.get('email')?.value;

        this.secondFormGroup.controls['email'].setValue(email);

        this.usersService.userByEmailGet(email).subscribe((x) => {
            if (x.obj) {
                this.secondFormGroup.controls['nome'].setValue(x.obj.userNome);
            }

            this.showSecondForm = true;
        });
    }

    submit() {
        var userInput: UserInput = {
            nome: this.secondFormGroup.get('nome')?.value,
            email: this.secondFormGroup.get('email')?.value,
            sistemaId: environment.sistema,
            cadastroId: this.vars.cadastro?.id!,
            userId: this.vars.user?.id,
            master: false,
            supervisor: false,
            sendInvite: this.secondFormGroup.get('sendInvite')?.value,
            comentario: this.secondFormGroup.get('comentario')?.value,
        };

        this.usersService.userCreateOrUpdate(userInput).subscribe((x) => {
            if (x.errorMessage != null) {
                this.createNotificationError(x.errorMessage.text);
                return;
            }

            this.createNotificationUserSucesso();
            this.router.navigate(['/sistema/users/user', this.getEncryptedId(x.obj[0].id)]);
            this.closeModal();
        });
    }

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
