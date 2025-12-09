import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import { SistemaTipo } from '../../../models';
import { DateUtilsService, StringsService } from '../../../services';

import { TextSeparatorComponent } from 'src/app/shared/controls/text-separator/text-separator';
import { MaskDirective } from 'src/app/shared/directives/mask.directive';
import { cnpjValidator, cpfValidator } from 'src/app/shared/validators';
import { FileServerSiteLogotipoComponent } from '../../../controls/file-server-site-logotipo/file-server-site-logotipo';

@Component({
    selector: 'newaccount-page',
    templateUrl: './newaccount.html',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, FileServerSiteLogotipoComponent, MaskDirective, TextSeparatorComponent],
})
export class NewAccountPage implements OnInit {
    store: any;
    currYear: number = new Date().getFullYear();

    resetError = false;
    logoImage: string;

    firstFormGroup: FormGroup;

    contratando = false;

    constructor(
        private dateUtils: DateUtilsService,
        public storeData: Store<any>,
        private formBuilder: FormBuilder,
        public stringsService: StringsService,
    ) {}

    ngOnInit(): void {
        this.createForm();

        this.initStore();

        this.logoImage = this.getLogoUrl();
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            razaoSocial: [null, Validators.required],
            cnpj: [null, [Validators.required, cnpjValidator]],
            responsavel: [null, Validators.required],
            rg: [null, Validators.required],
            cpf: [null, [Validators.required, cpfValidator]],
            endereco: [null, Validators.required],
            cep: [null, Validators.required],
            logradouro: [null, Validators.required],
            numero: [null, Validators.required],
            complemento: [null],
            bairro: [null, Validators.required],
            cidade: [null, Validators.required],
            estado: [null, [Validators.required, Validators.maxLength(2)]],
            telefone: [null, Validators.required],
        });
    }

    submit() {
        //this.login(this.firstFormGroup.get('u')?.value, this.firstFormGroup.get('p')?.value);
    }

    getLogoUrl(): string {
        switch (environment.sistema) {
            case SistemaTipo.Ponto:
                return 'deskspace-ponto.png';
            case SistemaTipo.Contabil:
                return 'deskspace-contabil.png';
            case SistemaTipo.Financeiro:
                return 'deskspace-financeiro.png';
            case SistemaTipo.Holerite:
                return 'deskspace-holerite.png';
            case SistemaTipo.Funcionario:
                return 'deskspace.png';
            case SistemaTipo.Revenda:
                return 'deskspace.png';
            default:
                return '';
        }
    }
}
