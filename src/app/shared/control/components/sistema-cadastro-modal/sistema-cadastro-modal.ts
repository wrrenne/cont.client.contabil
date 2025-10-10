import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SistemaCadastroInput } from '../../../../shared/control/models/inputs';
import { UsersService } from '../../../../shared/control/services/users.service';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ControlService } from '../../services/control.service';
import { SistemaTipo } from '../../../models';


export interface SistemaCadastroModalData {
    cadastroId?: number
}

@Component({
    selector: 'sistema-cadastro-modal',
    standalone: true,
    imports: [],
    templateUrl: './sistema-cadastro-modal.html'
})
export class SistemaCadastroModalComponent {

    showSecondForm = false

    firstFormGroup: FormGroup

    cadastroId?: number

    SistemaTipo = SistemaTipo

    isPonto = false
    constructor(
        private modal: NzModalRef,
        private router: Router,
        private formBuilder: FormBuilder,
        private vars: Vars,
        private usersService: UsersService,
        private encryptionService: EncryptionService,
        private notification: NzNotificationService,
        private dateUtilsService: DateUtilsService,
        private controlService: ControlService,
        @Inject(NZ_MODAL_DATA) data: SistemaCadastroModalData
    ) {
        this.cadastroId = data?.cadastroId
    }

    ngOnInit(): void {
        this.createForm()
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            sistemaId: [null, Validators.required],
            pacoteId: [null],
        });

        this.firstFormGroup.get('sistemaId')?.valueChanges.subscribe((sistemaIdValue) => {
            this.isPonto = sistemaIdValue == SistemaTipo.Ponto;
        });
    }

    closeModal(v?: boolean) {
        if (v)
            this.modal.close(v);
        else
            this.modal.close()
    }

    submit() {
        var input: SistemaCadastroInput =
        {
            cadastroId: this.cadastroId!,
            revendaId: this.vars.cadastro?.id!,
            dataInicial: this.dateUtilsService.GetDateIsoString(this.dateUtilsService.getToday()),
            sistemaId: this.firstFormGroup.get('sistemaId')?.value,
            revendaUserId: this.vars.user?.id!,
        }

        if (input.sistemaId == SistemaTipo.Ponto) {
            input.pacoteId = this.firstFormGroup.get('pacoteId')?.value
        }

        this.controlService.sistemaCadastroAdd(input).subscribe(x => {
            if (x.errorMessage != null) {
                this.createNotificationError(x.errorMessage.text)
                return;
            }

            this.createNotificationSistemaSucesso()
            this.closeModal(true)
        })
    }

    //tratamentoGo() {
    //    this.router.navigate(['/sistema/espelhos/fechamento']);
    //}

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id)
        //    return this.encryptionService.set(id)
    }

    createNotificationSistemaSucesso(): void {
        this.notification.create(
            'success',
            '',
            'Produto adicionado com sucesso'
        );
    }

    createNotificationError(erro: string): void {
        this.notification.create(
            'error',
            '',
            erro
        );
    }
}
