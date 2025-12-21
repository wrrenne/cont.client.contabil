import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ViaCepService } from '../../services/viaCep.service';
import { MunicipioSelectComponent } from '../../tabelas/components/municipio-select/municipio-select';
import { UfSelectComponent } from '../../tabelas/components/uf-select/uf-select';
import { UfPageItem } from '../../tabelas/models/pageItems';
import { MunicipioParameter } from '../../tabelas/models/parameters';
import { InputExComponent } from '../input-ex/input-ex';

@Component({
    selector: 'endereco',
    standalone: true,
    imports: [ReactiveFormsModule, InputExComponent, UfSelectComponent, MunicipioSelectComponent],
    templateUrl: './endereco.html',
})
export class EnderecoComponent implements OnInit {
    form!: FormGroup;
    viaCepAvailable = true;

    municipioParameter: MunicipioParameter;

    constructor(
        private controlContainer: ControlContainer,
        private viaCepService: ViaCepService,
    ) {}

    ngOnInit() {
        this.form = this.controlContainer.control as FormGroup;

        // 1️⃣ Desabilitar campos por padrão
        this.disableAutoFields();

        // 2️⃣ Configurar autocomplete
        this.setupCepAutocomplete();
    }

    private disableAutoFields() {
        ['logradouro', 'bairro', 'municipioCodigo', 'municipioTexto', 'uf'].forEach((field) => this.form.get(field)?.disable({ emitEvent: false }));
    }

    private enableAutoFields() {
        ['logradouro', 'bairro', 'municipioCodigo', 'municipioTexto', 'uf'].forEach((field) => this.form.get(field)?.enable({ emitEvent: false }));
    }

    private setupCepAutocomplete() {
        this.form
            .get('cep')
            ?.valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                filter((cep) => !!cep && cep.replace(/\D/g, '').length === 8),
            )
            .subscribe((cep) => {
                const cleanCep = cep.replace(/\D/g, '');

                this.viaCepService.getAddress(cleanCep).subscribe({
                    next: (address) => {
                        if (address.erro) {
                            this.handleViaCepFailure();
                            return;
                        }

                        this.viaCepAvailable = true;

                        this.form.patchValue(
                            {
                                logradouro: address.logradouro,
                                bairro: address.bairro,
                                municipioTexto: address.localidade,
                                municipioCodigo: address.ibge,
                                uf: address.uf,
                            },
                            { emitEvent: false },
                        );
                    },
                    error: () => {
                        this.handleViaCepFailure();
                    },
                });
            });
    }

    private handleViaCepFailure() {
        this.viaCepAvailable = false;
        this.enableAutoFields();
    }

    ufSelected(e: any) {
        const uf = <UfPageItem>e;

        this.form.patchValue(
            {
                estado: e,
            },
            { emitEvent: false },
        );

        this.municipioParameter = { uf: uf.sigla };
    }
}
