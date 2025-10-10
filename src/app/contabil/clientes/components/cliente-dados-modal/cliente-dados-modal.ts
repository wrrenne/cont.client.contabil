import { Component, Inject, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { TTipoPessoa } from '../../../../shared/enums';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClienteInput } from '../../../models/clientes/inputs';
import { ContabilClienteView } from '../../../models/clientes/views';
import { ClientesService } from '../../services/clientes.service';

@Component({
    selector: 'cliente-dados-modal',
    templateUrl: './cliente-dados-modal.html',
    standalone: true
})
export class ClienteDadosModalComponent extends ModalBaseComponent {

    firstFormGroup: FormGroup
    secondFormGroup: FormGroup

    cliente: ContabilClienteView

    private _clienteId: number | undefined
    @Input() get clienteId() {
        return this._clienteId
    }
    set clienteId(value: number | undefined) {
        if (!value) return

        this._clienteId = value
        this.getData(<number>value)
    }

    constructor(
        injector: Injector,
        private router: Router,
        private formBuilder: FormBuilder,
        private clientesService: ClientesService,
        private encryptionService: EncryptionService,
        private vars: Vars,
        @Inject(NZ_MODAL_DATA) data: any
    ) {
        super(injector)
        this.clienteId = data.id
    }

    createFormJuridica(cliente: ContabilClienteView) {
        this.firstFormGroup = this.formBuilder.group({
            nome: [cliente.nome, Validators.required],
            cnpj: [cliente.cnpj, Validators.required],
            inscricaoEstadual: [cliente.inscricaoEstadual],
            comentario: []
        });
    }

    createFormFisica(cliente: ContabilClienteView) {
        this.secondFormGroup = this.formBuilder.group({
            nome: [cliente.nome, Validators.required],
            cpf: [cliente.cpf, Validators.required],
            comentario: []
        });
    }

    submitFirstFormGroup() {
        var input: ClienteInput =
        {
            id: this.cliente?.id,
            cadastroId: this.vars.cadastro?.id,
            nome: this.firstFormGroup.get('nome')?.value,
            cnpj: this.firstFormGroup.get('cnpj')?.value,
            inscricaoEstadual: this.firstFormGroup.get('inscricaoEstadual')?.value,
            comentario: this.firstFormGroup.get('comentario')?.value,
            userId: this.vars.user?.id!
        }

        this.clientesService.clienteCreateOrUpdate(input).subscribe(x => {
            if (x.errorMessage == null) {
                this.firstFormGroup.markAsPristine();
                this.firstFormGroup.markAsUntouched();
                this.firstFormGroup.updateValueAndValidity();

                this.createNotificationSucesso()
                this.closeModal(x.obj[0])
            }
        })
    }

    submitSecondFormGroup() {
        var input: ClienteInput =
        {
            id: this.cliente?.id,
            cadastroId: this.vars.cadastro?.id,
            nome: this.secondFormGroup.get('nome')?.value,
            cpf: this.secondFormGroup.get('cnpj')?.value,
            comentario: this.secondFormGroup.get('comentario')?.value,
            userId: this.vars.user?.id!
        }

        this.clientesService.clienteCreateOrUpdate(input).subscribe(x => {
            if (x.errorMessage == null) {
                this.secondFormGroup.markAsPristine();
                this.secondFormGroup.markAsUntouched();
                this.secondFormGroup.updateValueAndValidity();

                this.createNotificationSucesso()
                this.closeModal(x.obj[0])
            }
        })
    }

    getData(id: number) {
        this.clientesService.clienteGet(id).subscribe(x => {
            this.cliente = x.obj
            this.title = this.cliente.nome
            this.subTitle = this.cliente.cnpjFormat ?? this.cliente.cpfFormat

            if (this.cliente.tipo == TTipoPessoa.PessoaJuridica)
                this.createFormJuridica(this.cliente)
            else
                this.createFormFisica(this.cliente)
        })
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id)
        //    return this.encryptionService.set(id)
    }
}
