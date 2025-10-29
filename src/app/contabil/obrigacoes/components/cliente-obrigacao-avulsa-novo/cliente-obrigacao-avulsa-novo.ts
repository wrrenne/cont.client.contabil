import { Component, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { InputMonthYearExComponent } from 'src/app/shared/controls/input-month-year-ex/input-month-year-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { InputYearExComponent } from 'src/app/shared/controls/input-year-ex/input-year-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { TPeriodicidade } from '../../../models/enums';
import { PerfilObrigacaoInput } from '../../../models/obrigacoes/inputs';
import { ObrigacaoPageItem } from '../../../models/obrigacoes/pagings';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { PerfilItemView } from '../../../models/obrigacoes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';
import { PerfisService } from '../../services/perfis.service';
import { ObrigacaoSelectComponent } from '../obrigacao-select/obrigacao-select';

export interface ClienteObrigacaoAvulsaNovoModalData {
    clienteId: number;
}

@Component({
    selector: 'cliente-obrigacao-avulsa-novo',
    templateUrl: './cliente-obrigacao-avulsa-novo.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ModalBaseComponent,
        ObrigacaoSelectComponent,
        InputMonthYearExComponent,
        InputYearExComponent,
        InputTextAreaExComponent,
    ],
})
export class ClienteObrigacaoAvulsaNovoModalComponent extends ModalBaseComponent {
    firstFormGroup: FormGroup;

    parameters: ObrigacoesParameter;

    perfilItem: PerfilItemView;

    periodicidade: TPeriodicidade;

    TPeriodicidade = TPeriodicidade;

    constructor(
        private formBuilder: FormBuilder,
        private dateUtilsService: DateUtilsService,
        private vars: Vars,
        private perfisService: PerfisService,
        private clientesService: ClientesService,
        private obrigacoesService: ObrigacoesService,
        injector: Injector,
        @Inject(NZ_MODAL_DATA) data: ClienteObrigacaoAvulsaNovoModalData,
    ) {
        super(injector);
        this.clientesService.clienteGet(data.clienteId).subscribe((x) => (this.title = x.obj.nome));
        this.parameters = {};
    }

    ngOnInit(): void {
        this.createForms();
    }

    createForms() {
        this.firstFormGroup = this.formBuilder.group({
            obrigacaoId: [null, Validators.required],
            competenciaMesInicial: [null],
            competenciaAnoInicial: [null],
            comentario: [null],
        });
        this.firstFormGroup.valueChanges.subscribe((val) => console.log(this.firstFormGroup.value));
    }

    submit() {
        var input: PerfilObrigacaoInput = {
            perfilItemId: this.perfilItem.perfilItemId,
            obrigacaoId: this.firstFormGroup.get('obrigacaoId')?.value,
            userId: this.vars.user?.id!,
            comentario: this.firstFormGroup.get('comentario')?.value,
        };

        if (this.periodicidade == TPeriodicidade.Anual) input.competenciaAnoInicial = this.firstFormGroup.get('competenciaAnoInicial')?.value;
        else
            input.competenciaInicial = this.dateUtilsService.GetDateIsoString(
                this.dateUtilsService.firstDateOfMonth(this.firstFormGroup.get('competenciaMesInicial')?.value),
            );

        this.perfisService.perfilObrigacaoCreateOrUpdate(input).subscribe((x) => {
            this.firstFormGroup.reset();

            this.obrigacoesService.obrigacaoPageItemGet(x.obj[0]).subscribe((y) => {
                this.closeModal(y.obj);
            });
        });
    }

    obrigacaoChanged(e: ObrigacaoPageItem) {
        this.periodicidade = e.periodicidade;
    }
}
