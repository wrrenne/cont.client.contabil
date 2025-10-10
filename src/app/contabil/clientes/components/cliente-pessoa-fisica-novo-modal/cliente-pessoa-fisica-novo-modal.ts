import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClienteInput } from '../../../models/clientes/inputs';
import { ClientesService } from '../../services/clientes.service';
import { TTipoPessoa } from '../../../../shared/enums';

@Component({
    selector: 'cliente-pessoa-fisica-novo-modal',
    templateUrl: './cliente-pessoa-fisica-novo-modal.html',
    standalone: true
})
export class ClientePessoaFisicaNovoModalComponent implements OnInit {

    firstFormGroup: FormGroup
    secondFormGroup: FormGroup

    showMainForm = false

    TTipoPessoa = TTipoPessoa

    constructor(
        private modal: NzModalRef,
        private router: Router,
        private formBuilder: FormBuilder,
        private dateUtilsService: DateUtilsService,
        private clientesService: ClientesService,
        private vars: Vars,
        private notification: NzNotificationService
    ) {
    }

    ngOnInit(): void {
        this.createForm()
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            cpf: [null, Validators.required],
        });
        this.secondFormGroup = this.formBuilder.group({
            nome: [null, Validators.required],
            inicio: [null, Validators.required],
            regime: [null, Validators.required],
            numero: [null],
            comentario: [null]
        });
    }

    closeModal(o?: number) {
        if (o)
            this.modal.close(o);
        else
            this.modal.close()
    }

    localizarCpfClick() {
        this.showMainForm = true
    }

    ignorarBuscaClick() {
        this.showMainForm = true
    }

    submit() {
        const input: ClienteInput =
        {
            cpf: this.firstFormGroup.get('cpf')?.value,
            dataInicial: this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.secondFormGroup.get('inicio')?.value)),
            nome: this.secondFormGroup.get('nome')?.value,
            numero: this.secondFormGroup.get('numero')?.value,
            regime: this.secondFormGroup.get('regime')?.value,
            userId: this.vars.user?.id!,
            cadastroId: this.vars.cadastro?.id,
            comentario: this.secondFormGroup.get('comentario')?.value,
        }

        this.clientesService.clienteCreateOrUpdate(input).subscribe(x => {
            if (!x.errorMessage) {
                this.createNotificationSucesso()
                this.firstFormGroup.reset()
                this.closeModal(x.obj[0])
            }
            else {
                this.createNotificationError(x.errorMessage.text)
            }
        })
    }

    createNotificationSucesso(): void {
        this.notification.create(
            'success',
            'Cliente',
            'Cliente criado com sucesso'
        );
    }

    createNotificationError(erro: string): void {
        this.notification.create(
            'error',
            'Cliente',
            erro
        );
    }
}
