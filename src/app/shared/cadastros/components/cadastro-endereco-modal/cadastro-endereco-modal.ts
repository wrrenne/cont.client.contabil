import { Component, Inject, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { Vars } from '../../../../shared/variables';
import { EnderecoInput } from '../../models/inputs';
import { EnderecoView } from '../../models/views';
import { CadastrosService } from '../../services/cadastros.service';
import { MunicipioParameter } from '../../../tabelas/models/parameters';


@Component({
    selector: 'cadastro-endereco-modal',
    standalone: true,
    imports: [],
    templateUrl: './cadastro-endereco-modal.html'
})
export class CadastroEnderecoModalComponent extends ModalBaseComponent {

    endereco: EnderecoView

    municipioParameter: MunicipioParameter

    firstFormGroup: FormGroup

    cadastroId: number

    private _id: number | undefined
    @Input() get id() {
        return this._id
    }
    set id(value: number | undefined) {
        this._id = value
        this.getData(<number>value)
    }

    constructor(
        injector: Injector,
        private cadastrosService: CadastrosService,
        private formBuilder: FormBuilder,
        private vars: Vars,
        @Inject(NZ_MODAL_DATA) data: any
    ) {
        super(injector)
        this.title = data.cadastroNome
        this.id = data.id
        this.cadastroId = data.cadastroId
    }

    getData(id?: number) {
        if (id) {
            this.cadastrosService.enderecoGet(id).subscribe(x => {
                this.endereco = x.obj
                this.subTitle = this.endereco.municipioTexto
                this.createForm(this.endereco)
            })
        }
        else {
            this.endereco = { }
            //this.endereco = { bairro: 'aaa', cep: '2000', logradouro: 'rua x', numero: '400', uf: 'SP', complemento: 'complemento', municipioCodigo: 3550308 }

            this.municipioParameter = {
                uf: this.endereco.uf!,
                searchText: ''
            }

            this.createForm(this.endereco)
        }
    }

    createForm(endereco: EnderecoView) {
        this.firstFormGroup = this.formBuilder.group({
            cep: [endereco.cep, Validators.required],
            logradouro: [endereco.logradouro, Validators.required],
            numero: [endereco.numero, Validators.required],
            complemento: [endereco.complemento],
            bairro: [endereco.bairro, Validators.required],
            municipio: [endereco.municipioCodigo, Validators.required],
            uf: [endereco.uf, Validators.required],
            comentario: [null]
        });

        this.firstFormGroup.get('uf')?.valueChanges.subscribe((ufValue) => {
            if (!ufValue) return

            this.municipioParameter = {
                uf: ufValue,
                searchText: ''
            }

            this.firstFormGroup.get('municipio')?.setValue(null)
        });
    }

    submitFirstFormGroup() {
        var input: EnderecoInput =
        {
            id: this.id,
            cadastroId: this.cadastroId,
            tipo: this.firstFormGroup.get('tipo')?.value,
            cep: this.firstFormGroup.get('cep')?.value,
            logradouro: this.firstFormGroup.get('logradouro')?.value,
            numero: this.firstFormGroup.get('numero')?.value,
            complemento: this.firstFormGroup.get('complemento')?.value,
            bairro: this.firstFormGroup.get('bairro')?.value,
            municipioCodigo: this.firstFormGroup.get('municipio')?.value,
            uf: this.firstFormGroup.get('uf')?.value,
            userId: this.vars.user?.id!,
            comentario: this.firstFormGroup.get('comentario')?.value
        }

        this.cadastrosService.enderecoCreateOrUpdate(input).subscribe(x => {
            if (x.errorMessage == null) {
                this.firstFormGroup.markAsPristine();
                this.firstFormGroup.markAsUntouched();
                this.firstFormGroup.updateValueAndValidity();

                this.createNotificationSucesso(this.title)
                this.closeModal(x.obj[0])
            }
        })
    }
}
