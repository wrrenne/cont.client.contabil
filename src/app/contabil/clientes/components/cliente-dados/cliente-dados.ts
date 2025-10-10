import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { CardComponent } from 'src/app/shared/controls/card/card.component';
import { LabelTextComponent } from 'src/app/shared/controls/label-text/label-text';
import { TTipoPessoa } from '../../../../shared/enums';
import { DateUtilsService } from '../../../../shared/services';
import { ContabilClienteView } from '../../../models/clientes/views';
import { ClientesService } from '../../services/clientes.service';
import { ClienteDadosModalComponent } from '../cliente-dados-modal/cliente-dados-modal';

@Component({
    selector: 'cliente-dados',
    templateUrl: './cliente-dados.html',
    providers: [NzModalService],
    standalone: true,
    imports: [CardComponent, LabelTextComponent, ButtonDefaultComponent],
})
export class ClienteDadosComponent {
    cliente: ContabilClienteView;

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    TTipoPessoa = TTipoPessoa;

    private _id: number | undefined;
    @Input() get id() {
        return this._id;
    }
    set id(value: number | undefined) {
        this._id = value;
        this.getData(<number>value);
    }

    constructor(
        private clientesService: ClientesService,
        private formBuilder: FormBuilder,
        private notification: NzNotificationService,
        private dateUtilsService: DateUtilsService,
        private modalService: NzModalService,
    ) {}

    //ngOnInit(): void {
    //    const urlParametrs = combineLatest([this.route.params,
    //        this.route.queryParams], (params, queryParams) => ({
    //            ...params, ...queryParams
    //        }));

    //    urlParametrs.subscribe(r => {
    //        const id: number = this.encryptionService.get(r['id'])

    //        this.getData(id)
    //        //this.parameters = { perfilItemId: r['pi'], searchText: r['q'] }
    //    });
    //}

    getData(id: number) {
        this.clientesService.clienteGet(id).subscribe((x) => {
            this.cliente = x.obj;
            this.createForm(this.cliente);
        });
    }

    createForm(cliente: ContabilClienteView) {
        this.firstFormGroup = this.formBuilder.group({
            razaoSocial: [cliente.nome, Validators.required],
            numero: [cliente.numero, Validators.required],
            cnpj: [cliente.cnpj, Validators.required],
            ie: [cliente.inscricaoEstadual],
        });
    }

    submitFirstFormGroup() {
        this.createNotification();
        //    var input: ClienteInput =
        //    {
        //        id: this.id,
        //        cliente:
        //        {
        //            nome: this.firstFormGroup.get('nome')?.value,
        //            cpf: this.firstFormGroup.get('cpf')?.value,
        //            pis: this.firstFormGroup.get('pis')?.value
        //        }
        //    }

        //    this.clientesService.clienteCreateOrUpdate(input).subscribe(x => {
        //        if (x.errorMessage == null) {
        //            this.firstFormGroup.markAsPristine();
        //            this.firstFormGroup.markAsUntouched();
        //            this.firstFormGroup.updateValueAndValidity();

        //            this.createNotification()
        //        }
        //    })
    }

    createNotification(): void {
        this.notification.create('success', 'Funcionário', 'Cadastro atualizado com sucesso');
    }

    editModal() {
        const modal = this.modalService.create({
            nzContent: ClienteDadosModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                id: <number>this.cliente?.id,
            },
        });

        modal.afterClose.subscribe((r) => this.getData(r));
    }
}
