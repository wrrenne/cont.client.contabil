import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RegimeSelectComponent } from 'src/app/contabil/components/regime-select/regime-select';
import { InputDateExComponent } from 'src/app/shared/controls/input-date-ex/input-date-ex';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { CadastrosService } from '../../../../shared/cadastros/services/cadastros.service';
import { TTipoPessoa } from '../../../../shared/enums';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClienteInput } from '../../../models/clientes/inputs';
import { ClientesService } from '../../services/clientes.service';

@Component({
    selector: 'cliente-pessoa-juridica-novo-modal',
    templateUrl: './cliente-pessoa-juridica-novo-modal.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ModalBaseComponent,
        InputExComponent,
        NgIcon,
        InputDateExComponent,
        RegimeSelectComponent,
        InputTextAreaExComponent,
    ],
})
export class ClientePessoaJuridicaNovoModalComponent implements OnInit {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    showMainForm = false;

    TTipoPessoa = TTipoPessoa;

    constructor(
        private modal: NzModalRef,
        private router: Router,
        private formBuilder: FormBuilder,
        private dateUtilsService: DateUtilsService,
        private clientesService: ClientesService,
        private cadastrosService: CadastrosService,
        private vars: Vars,
        private notification: NzNotificationService,
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            cnpj: [null, Validators.required],
        });
        this.secondFormGroup = this.formBuilder.group({
            nome: [null, Validators.required],
            inicio: [null, Validators.required],
            regime: [null, Validators.required],
            numero: [null],
            comentario: [null],
        });
    }

    closeModal(o?: number) {
        if (o) this.modal.close(o);
        else this.modal.close();
    }

    localizarCnpjClick() {
        const cnpj = this.firstFormGroup.get('cnpj')?.value;

        this.cadastrosService.cadastroByCnpjGet(cnpj).subscribe((x) => {
            if (x.obj) {
                console.log(['x.obj', x.obj]);
                this.secondFormGroup.controls['nome'].setValue(x.obj.nome);
            }

            this.showMainForm = true;
        });
    }

    ignorarBuscaClick() {
        this.showMainForm = true;
    }

    submit() {
        const input: ClienteInput = {
            cnpj: this.firstFormGroup.get('cnpj')?.value,
            dataInicial: this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.secondFormGroup.get('inicio')?.value)),
            nome: this.secondFormGroup.get('nome')?.value,
            numero: this.secondFormGroup.get('numero')?.value,
            regime: this.secondFormGroup.get('regime')?.value,
            userId: this.vars.user?.id!,
            cadastroId: this.vars.cadastro?.id,
            comentario: this.secondFormGroup.get('comentario')?.value,
        };

        this.clientesService.clienteCreateOrUpdate(input).subscribe((x) => {
            if (!x.errorMessage) {
                this.createNotificationSucesso();
                this.firstFormGroup.reset();
                this.closeModal(x.obj[0]);
            } else {
                this.createNotificationError(x.errorMessage.text);
            }
        });
    }

    createNotificationSucesso(): void {
        this.notification.create('success', 'Cliente', 'Cliente criado com sucesso');
    }

    createNotificationError(erro: string): void {
        this.notification.create('error', 'Cliente', erro);
    }
}
