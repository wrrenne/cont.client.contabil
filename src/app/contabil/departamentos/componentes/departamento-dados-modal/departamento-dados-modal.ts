import { Component, Inject, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { DepartamentoInput } from 'src/app/contabil/models/contabil/inputs';
import { DepartamentoView } from 'src/app/contabil/models/contabil/views';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { TTipoPessoa } from '../../../../shared/enums';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClienteInput } from '../../../models/clientes/inputs';
import { DepartamentosService } from '../../services/departamentos.service';

@Component({
    selector: 'departamento-dados-modal',
    templateUrl: './departamento-dados-modal.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, InputExComponent, InputTextAreaExComponent, ButtonDefaultComponent],
})
export class DepartamentoDadosModalComponent extends ModalBaseComponent {
    firstFormGroup: FormGroup;

    departamento: DepartamentoView;

    private _id: number | undefined;
    @Input() get id() {
        return this._id;
    }
    set id(value: number | undefined) {
        if (!value) return;

        this._id = value;
        this.getData(<number>value);
    }

    constructor(
        injector: Injector,
        private router: Router,
        private formBuilder: FormBuilder,
        private departamentosService: DepartamentosService,
        private encryptionService: EncryptionService,
        private vars: Vars,
        @Inject(NZ_MODAL_DATA) data: any,
    ) {
        super(injector);
        this.id = data.id;
    }

    createForm(departamento: DepartamentoView) {
        this.firstFormGroup = this.formBuilder.group({
            nome: [departamento.nome, Validators.required],
            comentario: [],
        });
    }

    submitFirstFormGroup() {
        var input: DepartamentoInput = {
            id: this.departamento?.id,
            cadastroId: this.vars.cadastro?.id!,
            nome: this.firstFormGroup.get('nome')?.value,
            comentario: this.firstFormGroup.get('comentario')?.value,
            userId: this.vars.user?.id!,
        };

        this.departamentosService.clienteCreateOrUpdate(input).subscribe((x) => {
            if (x.errorMessage == null) {
                this.firstFormGroup.markAsPristine();
                this.firstFormGroup.markAsUntouched();
                this.firstFormGroup.updateValueAndValidity();

                this.createNotificationSucesso();
                this.closeModal(x.obj[0]);
            }
        });
    }

    submitSecondFormGroup() {
        var input: ClienteInput = {
            id: this.departamento?.id,
            cadastroId: this.vars.cadastro?.id,
            nome: this.secondFormGroup.get('nome')?.value,
            cpf: this.secondFormGroup.get('cnpj')?.value,
            comentario: this.secondFormGroup.get('comentario')?.value,
            userId: this.vars.user?.id!,
        };

        this.departamentosService.clienteCreateOrUpdate(input).subscribe((x) => {
            if (x.errorMessage == null) {
                this.secondFormGroup.markAsPristine();
                this.secondFormGroup.markAsUntouched();
                this.secondFormGroup.updateValueAndValidity();

                this.createNotificationSucesso();
                this.closeModal(x.obj[0]);
            }
        });
    }

    getData(id: number) {
        this.departamentosService.clienteGet(id).subscribe((x) => {
            this.departamento = x.obj;
            this.title = this.departamento.nome;
            this.subTitle = this.departamento.cnpjFormat ?? this.departamento.cpfFormat;

            if (this.departamento.tipo == TTipoPessoa.PessoaJuridica) this.createFormJuridica(this.departamento);
            else this.createFormFisica(this.departamento);
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
        //    return this.encryptionService.set(id)
    }
}
