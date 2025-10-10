import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CardComponent } from 'src/app/shared/controls/card/card.component';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { environment } from '../../../../../environments/environment';
import { UserInput } from '../../../../shared/control/models/inputs';
import { UserView } from '../../../../shared/control/models/views';
import { UsersService } from '../../../../shared/control/services/users.service';
import { Vars } from '../../../../shared/variables';

@Component({
    selector: 'user-dados',
    standalone: true,
    templateUrl: './user-dados.html',
    imports: [FormsModule, ReactiveFormsModule, CardComponent, InputExComponent, NgIcon],
})
export class UserDadosComponent {
    firstFormGroup: FormGroup;

    private _user: UserView | undefined;
    @Input() get user() {
        return this._user;
    }
    set user(value: UserView | undefined) {
        this._user = value;
        this.createForm(<UserView>this.user);
    }

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private notification: NzNotificationService,
        private vars: Vars,
    ) {}

    createForm(user: UserView) {
        this.firstFormGroup = this.formBuilder.group({
            nome: [user.userNome, Validators.required],
            email: [user.email, Validators.required],
        });
    }

    submitFirstFormGroup() {
        var input: UserInput = {
            cadastroId: this.vars.cadastro?.id,
            id: this.user?.id,
            nome: this.firstFormGroup.get('nome')?.value,
            email: this.firstFormGroup.get('email')?.value,
            sistemaId: environment.sistema,
            master: false,
            supervisor: false,
        };

        this.usersService.userCreateOrUpdate(input).subscribe((x) => {
            if (x.errorMessage == null) {
                this.firstFormGroup.markAsPristine();
                this.firstFormGroup.markAsUntouched();
                this.firstFormGroup.updateValueAndValidity();

                this.createNotification();
            } else {
                this.createNotificationError(x.errorMessage.text);
            }
        });
    }

    createNotification(): void {
        this.notification.create('success', 'Usuário', 'Usuário atualizado com sucesso');
    }

    createNotificationError(err: string): void {
        this.notification.create('error', 'Usuário', err);
    }
}
