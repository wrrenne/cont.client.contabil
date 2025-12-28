import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { FACTORY_REVENDA } from 'src/app/shared/constants/geral';
import { PacotePontoSelectComponent } from 'src/app/shared/control/components/pacote-ponto-select/pacote-ponto-select';
import { NovoAcessoInput } from 'src/app/shared/control/models/inputs';
import { PacoteView } from 'src/app/shared/control/models/planos/views/pacoteView';
import { ControlService } from 'src/app/shared/control/services/control.service';
import { PlanosService } from 'src/app/shared/control/services/planos.service';
import { EnderecoComponent } from 'src/app/shared/controls/endereco/endereco';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { TextSeparatorComponent } from 'src/app/shared/controls/text-separator/text-separator';
import { MaskDirective } from 'src/app/shared/directives/mask.directive';
import { AppService } from 'src/app/shared/services/app.service';
import { HtmlUtilsService } from 'src/app/shared/services/htmlUtils.service';
import { cnpjValidator, cpfValidator } from 'src/app/shared/validators';
import { Vars } from 'src/app/shared/variables';
import { environment } from '../../../../../environments/environment';
import { FileServerSiteLogotipoComponent } from '../../../controls/file-server-site-logotipo/file-server-site-logotipo';
import { EncryptionService, StringsService } from '../../../services';

@Component({
    selector: 'newaccount-page',
    templateUrl: './newaccount.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        FileServerSiteLogotipoComponent,
        MaskDirective,
        NgIconComponent,
        InputExComponent,
        PacotePontoSelectComponent,
        EnderecoComponent,
        TextSeparatorComponent,
    ],
})
export class NewAccountPage implements OnInit {
    resetError = false;
    logoImage: string;

    firstFormGroup: FormGroup;

    submitted = false;
    pacote?: PacoteView;

    revendaId?: number;

    constructor(
        private controlService: ControlService,
        public storeData: Store<any>,
        private formBuilder: FormBuilder,
        public stringsService: StringsService,
        private vars: Vars,
        private appService: AppService,
        private planosService: PlanosService,
        private htmlUtils: HtmlUtilsService,
        private encryptionService: EncryptionService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.appService.initStoreData();

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            if (r['r']) this.revendaId = this.encryptionService.decrypt(r['r']);
        });

        if (this.vars.pacoteId) {
            this.planosService.pacoteGet(this.vars.pacoteId).subscribe((x) => {
                this.pacote = x.obj;
                this.createForm();
            });
        } else {
            this.createForm();
        }

        this.logoImage = this.htmlUtils.getLogoUrl();
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            // razaoSocial: ['Bento e Nair Limpeza ME', Validators.required],
            // cnpj: ['11593072000106', [Validators.required, cnpjValidator]],
            // responsavel: ['Débora Andrea Caldeira', Validators.required],
            // cpf: ['73176188889', [Validators.required, cpfValidator]],
            // endereco: this.formBuilder.group({
            //     cep: ['05658000', Validators.required],
            //     logradouro: [null, Validators.required],
            //     numero: ['197', Validators.required],
            //     complemento: [null],
            //     bairro: [null, Validators.required],
            //     municipioCodigo: [null, Validators.required],
            //     municipioTexto: [null, Validators.required],
            //     uf: [null, [Validators.required, Validators.maxLength(2)]],
            // }),
            // ddd: ['011', Validators.required],
            // telefone: ['27380771'],
            // celular: ['988058088'],
            // email: ['separate.wolf.qems@protectsmail.net', Validators.required],
            // p: ['1234', Validators.required],
            // pconfirmacao: ['1234', Validators.required],
            // pacoteId: [this.pacote?.id, Validators.required],
            razaoSocial: [null, Validators.required],
            cnpj: [null, [Validators.required, cnpjValidator]],
            responsavel: [null, Validators.required],
            cpf: [null, [Validators.required, cpfValidator]],
            endereco: this.formBuilder.group({
                cep: [null, Validators.required],
                logradouro: [null, Validators.required],
                numero: [null, Validators.required],
                complemento: [null],
                bairro: [null, Validators.required],
                municipioCodigo: [null, Validators.required],
                municipioTexto: [null, Validators.required],
                uf: [null, [Validators.required, Validators.maxLength(2)]],
            }),
            ddd: [null, Validators.required],
            telefone: [null],
            celular: [null],
            email: [null, Validators.required],
            p: [null, Validators.required],
            pconfirmacao: [null, Validators.required],
            pacoteId: [this.pacote?.id, Validators.required],
        });
    }

    submit() {
        if (this.firstFormGroup.invalid) {
            this.firstFormGroup.markAllAsTouched();
            return;
        }

        var input: NovoAcessoInput = {
            revendaId: this.revendaId ?? FACTORY_REVENDA,
            razaoSocial: this.firstFormGroup.get('razaoSocial')?.value,
            cnpj: this.stringsService.removeSymbols(this.firstFormGroup.get('cnpj')?.value),
            responsavel: this.firstFormGroup.get('responsavel')?.value,
            cpf: this.stringsService.removeSymbols(this.firstFormGroup.get('cpf')?.value),

            cep: this.stringsService.removeSymbols(this.firstFormGroup.get('endereco.cep')?.value),
            logradouro: this.firstFormGroup.get('endereco.logradouro')?.value,
            numero: this.firstFormGroup.get('endereco.numero')?.value,
            complemento: this.firstFormGroup.get('endereco.complemento')?.value,
            bairro: this.firstFormGroup.get('endereco.bairro')?.value,
            municipioCodigo: this.firstFormGroup.get('endereco.municipioCodigo')?.value,
            municipioTexto: this.firstFormGroup.get('endereco.municipioTexto')?.value,
            uf: this.firstFormGroup.get('endereco.uf')?.value,

            ddd: this.firstFormGroup.get('ddd')?.value,
            telefone: this.stringsService.removeSymbols(this.firstFormGroup.get('telefone')?.value),
            celular: this.stringsService.removeSymbols(this.firstFormGroup.get('celular')?.value),
            email: this.firstFormGroup.get('email')?.value,
            password: this.firstFormGroup.get('p')?.value,
            sistemaId: environment.sistema,
            pacoteId: this.firstFormGroup.get('pacoteId')?.value,
        };

        this.controlService.novoAcesso(input).subscribe((x) => {
            this.submitted = true;
        });
    }

    isInvalid(controlName: string): boolean {
        const control = this.firstFormGroup.get(controlName);
        return !!(control && control.invalid && (control.touched || control.dirty));
    }
}
