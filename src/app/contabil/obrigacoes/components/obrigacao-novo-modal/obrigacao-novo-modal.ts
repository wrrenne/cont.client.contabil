import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { DiaTipoSelectComponent } from 'src/app/contabil/components/dia-tipo-select/dia-tipo-select';
import { EsferaSelectComponent } from 'src/app/contabil/components/esfera-select/esfera-select';
import { FeriadoTipoSelectComponent } from 'src/app/contabil/components/feriado-tipo-select/feriado-tipo-select';
import { PeriodicidadeSelectComponent } from 'src/app/contabil/components/periodicidade-select/periodicidade-select';
import { PeriodoAnualSelectComponent } from 'src/app/contabil/components/periodo-anual-select/periodo-anual-select';
import { PeriodoMensalSelectComponent } from 'src/app/contabil/components/periodo-mensal-select/periodo-mensal-select';
import { DepartamentoSelectComponent } from 'src/app/contabil/departamentos/componentes/departamento-select/departamento-select';
import { InputDayExComponent } from 'src/app/shared/controls/input-day-ex/input-day-ex';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { InputMonthExComponent } from 'src/app/shared/controls/input-month-ex/input-month-ex';
import { InputMonthYearExComponent } from 'src/app/shared/controls/input-month-year-ex/input-month-year-ex';
import { InputSelectNumberExComponent } from 'src/app/shared/controls/input-select-number-ex/input-select-number-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { InputYearExComponent } from 'src/app/shared/controls/input-year-ex/input-year-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { MunicipioSelectComponent } from 'src/app/shared/tabelas/components/municipio-select/municipio-select';
import { UfSelectComponent } from 'src/app/shared/tabelas/components/uf-select/uf-select';
import { DateUtilsService } from '../../../../shared/services';
import { MunicipioParameter } from '../../../../shared/tabelas/models/parameters';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoTipoNovoDescription, TEsfera, TObrigacaoTipo, TPeriodicidade } from '../../../models/enums';
import {
    AcessoriaAnualInput,
    AcessoriaMensalInput,
    ImpostoAnualInput,
    ImpostoMensalInput,
    ObrigacaoInput,
    RelatorioAnualInput,
    RelatorioMensalInput,
} from '../../../models/obrigacoes/inputs';
import { ObrigacoesService } from '../../services/obrigacoes.service';

export interface ObrigacaoNovoModalData {
    tipo: TObrigacaoTipo;
}

@Component({
    selector: 'obrigacao-novo-modal',
    templateUrl: './obrigacao-novo-modal.html',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ModalBaseComponent,
        InputExComponent,
        EsferaSelectComponent,
        MunicipioSelectComponent,
        UfSelectComponent,
        PeriodicidadeSelectComponent,
        InputDayExComponent,
        DiaTipoSelectComponent,
        FeriadoTipoSelectComponent,
        PeriodoMensalSelectComponent,
        InputSelectNumberExComponent,
        InputMonthYearExComponent,
        InputTextAreaExComponent,
        PeriodoAnualSelectComponent,
        InputMonthExComponent,
        InputYearExComponent,
        DepartamentoSelectComponent,
    ],
})
export class ObrigacaoNovoModalComponent {
    TObrigacaoTipo = TObrigacaoTipo;
    TPeriodicidade = TPeriodicidade;

    tipo: TObrigacaoTipo;
    title: string;
    periodicidade?: TPeriodicidade;

    municipioParameter: MunicipioParameter;

    isformsValid = false;

    firstFormGroup: FormGroup;
    impostoOuAcessoriaMensalFormGroup: FormGroup;
    impostoOuAcessoriaAnualFormGroup: FormGroup;
    relatorioMensalFormGroup: FormGroup;
    relatorioAnualFormGroup: FormGroup;

    impostoOuAcessoriaMensal: any;
    impostoOuAcessoriaAnual: any;
    relatorioMensal: any;
    relatorioAnual: any;
    //conclusao: any;
    //secondFormGroup: any;

    //userView: UserView

    //confirmacaoStepDescricao: string

    isEsferaMunicipal = false;
    isEsferaEstadual = false;
    uf: string;
    municipioCodigo?: number;

    constructor(
        private modal: NzModalRef,
        private formBuilder: FormBuilder,
        //private stepperService: StepperService,
        private vars: Vars,
        private obrigacoesService: ObrigacoesService,
        private dateUtilsService: DateUtilsService,
        @Inject(NZ_MODAL_DATA) data: ObrigacaoNovoModalData,
    ) {
        this.tipo = data.tipo;

        this.title = ObrigacaoTipoNovoDescription.get(this.tipo)!;
    }

    ngOnInit(): void {
        this.createFirstForm();
        this.createImpostoOuAcessoriaMensalForm();
        this.createImpostoOuAcessoriaAnualForm();
        this.createRelatorioMensalForm();
        this.createRelatorioAnualForm();

        this.monitorFormChanged(this.firstFormGroup);
        this.monitorFormChanged(this.impostoOuAcessoriaMensalFormGroup);
        this.monitorFormChanged(this.impostoOuAcessoriaAnualFormGroup);
        this.monitorFormChanged(this.relatorioMensalFormGroup);
        this.monitorFormChanged(this.relatorioAnualFormGroup);
    }

    p: any;

    createFirstForm() {
        this.firstFormGroup = this.formBuilder.group({
            periodicidade: [null, Validators.required],
            departamentoId: [null, Validators.required],
            esfera: [null],
            municipioCodigo: [3550308],
            uf: ['SP'],
            descricao: [null, Validators.required],
        });

        this.firstFormGroup.valueChanges.subscribe((val) => {
            this.periodicidade = val.periodicidade;
            this.isEsferaEstadual = val.esfera == TEsfera.Estadual;
            this.isEsferaMunicipal = val.esfera == TEsfera.Municipal;
            this.uf = val.uf;
            this.municipioParameter = { uf: val.uf, codigo: val.municipioCodigo };
        });
    }

    createImpostoOuAcessoriaMensalForm() {
        this.impostoOuAcessoriaMensalFormGroup = this.formBuilder.group({
            vencimentoDia: [null, Validators.required],
            diaTipo: [null, Validators.required],
            prazoAntesVencimento: [null, Validators.required],
            periodoMensal: [null, Validators.required],
            feriadoTipo: [null, Validators.required],
            competenciaInicial: [null, Validators.required],
            comentario: [null],
        });
    }

    createImpostoOuAcessoriaAnualForm() {
        this.impostoOuAcessoriaAnualFormGroup = this.formBuilder.group({
            vencimentoDia: [null, Validators.required],
            diaTipo: [null, Validators.required],
            prazoAntesVencimento: [null, Validators.required],
            periodoAnual: [null, Validators.required],
            feriadoTipo: [null, Validators.required],
            competenciaInicial: [null, Validators.required],
            vencimentoMes: [3, Validators.required],
            comentario: [null],
        });
    }

    createRelatorioMensalForm() {
        this.relatorioMensalFormGroup = this.formBuilder.group({
            prazoDia: [null, Validators.required],
            diaTipo: [null, Validators.required],
            periodoMensal: [null, Validators.required],
            feriadoTipo: [null, Validators.required],
            competenciaInicial: [null, Validators.required],
            comentario: [null],
        });
    }

    createRelatorioAnualForm() {
        this.relatorioAnualFormGroup = this.formBuilder.group({
            prazoDia: [null, Validators.required],
            diaTipo: [null, Validators.required],
            periodoAnual: [null, Validators.required],
            feriadoTipo: [null, Validators.required],
            competenciaInicial: [null, Validators.required],
            prazoMes: [null, Validators.required],
            comentario: [null],
        });
    }

    closeModal(o?: number) {
        if (o != undefined) {
            this.modal.close(o);
        } else {
            this.modal.close();
        }
    }

    submit() {
        var impostoMensal: ImpostoMensalInput | undefined = undefined;
        var impostoAnual: ImpostoAnualInput | undefined = undefined;
        var acessoriaMensal: AcessoriaMensalInput | undefined = undefined;
        var acessoriaAnual: AcessoriaAnualInput | undefined = undefined;
        var relatorioMensal: RelatorioMensalInput | undefined = undefined;
        var relatorioAnual: RelatorioAnualInput | undefined = undefined;

        var periodicidade = this.firstFormGroup.get('periodicidade')?.value;
        var comentario = '';

        switch (this.tipo) {
            case <number>TObrigacaoTipo.Imposto:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    impostoMensal = {
                        competenciaInicial: this.dateUtilsService.GetDateIsoString(
                            this.dateUtilsService.firstDateOfMonth(this.impostoOuAcessoriaMensalFormGroup.get('competenciaInicial')?.value),
                        ),
                        vencimentoDia: this.impostoOuAcessoriaMensalFormGroup.get('vencimentoDia')?.value,
                        vencimentoDiaTipo: this.impostoOuAcessoriaMensalFormGroup.get('diaTipo')?.value,
                        prazoDiaAntesVencimento: this.impostoOuAcessoriaMensalFormGroup.get('prazoAntesVencimento')?.value,
                        periodoMensal: this.impostoOuAcessoriaMensalFormGroup.get('periodoMensal')?.value,
                        feriadoTipo: this.impostoOuAcessoriaMensalFormGroup.get('feriadoTipo')?.value,
                    };

                    comentario = this.impostoOuAcessoriaMensalFormGroup.get('comentario')?.value;
                } else {
                    //var competenciaAnoInicial = this.dateUtilsService.getYear(this.impostoOuAcessoriaAnualFormGroup.get('competenciaInicial')?.value)

                    impostoAnual = {
                        competenciaAnoInicial: this.impostoOuAcessoriaAnualFormGroup.get('competenciaInicial')?.value,
                        vencimentoDia: this.impostoOuAcessoriaAnualFormGroup.get('vencimentoDia')?.value,
                        vencimentoDiaTipo: this.impostoOuAcessoriaAnualFormGroup.get('diaTipo')?.value,
                        prazoDiaAntesVencimento: this.impostoOuAcessoriaAnualFormGroup.get('prazoAntesVencimento')?.value,
                        periodoAnual: this.impostoOuAcessoriaAnualFormGroup.get('periodoAnual')?.value,
                        feriadoTipo: this.impostoOuAcessoriaAnualFormGroup.get('feriadoTipo')?.value,
                        vencimentoMes: this.impostoOuAcessoriaAnualFormGroup.get('vencimentoMes')?.value,
                    };

                    comentario = this.impostoOuAcessoriaAnualFormGroup.get('comentario')?.value;
                }
                break;
            case <number>TObrigacaoTipo.Acessoria:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    acessoriaMensal = {
                        competenciaInicial: this.dateUtilsService.GetDateIsoString(
                            this.dateUtilsService.firstDateOfMonth(this.impostoOuAcessoriaMensalFormGroup.get('competenciaInicial')?.value),
                        ),
                        vencimentoDia: this.impostoOuAcessoriaMensalFormGroup.get('vencimentoDia')?.value,
                        vencimentoDiaTipo: this.impostoOuAcessoriaMensalFormGroup.get('diaTipo')?.value,
                        prazoDiaAntesVencimento: this.impostoOuAcessoriaMensalFormGroup.get('prazoAntesVencimento')?.value,
                        periodoMensal: this.impostoOuAcessoriaMensalFormGroup.get('periodoMensal')?.value,
                        feriadoTipo: this.impostoOuAcessoriaMensalFormGroup.get('feriadoTipo')?.value,
                    };

                    comentario = this.impostoOuAcessoriaMensalFormGroup.get('comentario')?.value;
                } else {
                    var competenciaAnoInicial = this.dateUtilsService.getYear(this.impostoOuAcessoriaAnualFormGroup.get('competenciaInicial')?.value);

                    acessoriaAnual = {
                        competenciaAnoInicial: competenciaAnoInicial,
                        vencimentoDia: this.impostoOuAcessoriaAnualFormGroup.get('vencimentoDia')?.value,
                        vencimentoDiaTipo: this.impostoOuAcessoriaAnualFormGroup.get('diaTipo')?.value,
                        prazoDiaAntesVencimento: this.impostoOuAcessoriaAnualFormGroup.get('prazoAntesVencimento')?.value,
                        periodoAnual: this.impostoOuAcessoriaAnualFormGroup.get('periodoAnual')?.value,
                        feriadoTipo: this.impostoOuAcessoriaAnualFormGroup.get('feriadoTipo')?.value,
                        vencimentoMes: this.impostoOuAcessoriaAnualFormGroup.get('vencimentoMes')?.value,
                    };

                    comentario = this.impostoOuAcessoriaAnualFormGroup.get('comentario')?.value;
                }
                break;
            case <number>TObrigacaoTipo.Relatorio:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    relatorioMensal = {
                        competenciaInicial: this.dateUtilsService.GetDateIsoString(
                            this.dateUtilsService.firstDateOfMonth(this.relatorioMensalFormGroup.get('competenciaInicial')?.value),
                        ),
                        prazoDia: this.relatorioMensalFormGroup.get('prazoDia')?.value,
                        prazoDiaTipo: this.relatorioMensalFormGroup.get('prazoDiaTipo')?.value,
                        periodoMensal: this.relatorioMensalFormGroup.get('periodoMensal')?.value,
                        feriadoTipo: this.relatorioMensalFormGroup.get('feriadoTipo')?.value,
                    };

                    comentario = this.relatorioMensalFormGroup.get('comentario')?.value;
                } else {
                    //var competenciaInicial = this.dateUtilsService.getYear(this.relatorioAnualFormGroup.get('competenciaInicial')?.value)

                    relatorioAnual = {
                        competenciaAnoInicial: this.relatorioAnualFormGroup.get('competenciaInicial')?.value,
                        prazoDia: this.relatorioAnualFormGroup.get('prazoDia')?.value,
                        prazoDiaTipo: this.relatorioAnualFormGroup.get('diaTipo')?.value,
                        periodoAnual: this.relatorioAnualFormGroup.get('periodoAnual')?.value,
                        feriadoTipo: this.relatorioAnualFormGroup.get('feriadoTipo')?.value,
                        prazoMes: this.relatorioAnualFormGroup.get('prazoMes')?.value,
                    };

                    comentario = this.relatorioAnualFormGroup.get('comentario')?.value;
                }
                break;
        }

        var input: ObrigacaoInput = {
            cadastroId: this.vars.cadastro?.id!,
            descricao: this.firstFormGroup.get('descricao')?.value,
            tipo: this.tipo,
            periodicidade: this.firstFormGroup.get('periodicidade')?.value,
            esfera: this.firstFormGroup.get('esfera')?.value,
            departamentoId: this.firstFormGroup.get('departamentoId')?.value,
            municipioCodigo: this.firstFormGroup.get('esfera')?.value == TEsfera.Municipal ? this.firstFormGroup.get('municipioCodigo')?.value : undefined,
            uf: this.firstFormGroup.get('esfera')?.value == TEsfera.Estadual ? this.firstFormGroup.get('uf')?.value : undefined,
            impostoMensal: impostoMensal,
            impostoAnual: impostoAnual,
            acessoriaMensal: acessoriaMensal,
            acessoriaAnual: acessoriaAnual,
            relatorioMensal: relatorioMensal,
            relatorioAnual: relatorioAnual,
            userId: this.vars.user?.id!,
            comentario: comentario,
        };

        this.obrigacoesService.obrigacaoCreateOrUpdate(input).subscribe((x) => {
            this.closeModal(x.obj[0]);
        });
    }

    checkIfFormsAreValid() {
        var secondFormGroupValid = false;

        var periodicidade = this.firstFormGroup.get('periodicidade')?.value;

        switch (this.tipo) {
            case <number>TObrigacaoTipo.Imposto:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    secondFormGroupValid = this.impostoOuAcessoriaMensalFormGroup.valid;
                } else {
                    secondFormGroupValid = this.impostoOuAcessoriaAnualFormGroup.valid;
                }
                break;

            case <number>TObrigacaoTipo.Acessoria:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    secondFormGroupValid = this.impostoOuAcessoriaMensalFormGroup.valid;
                } else {
                    secondFormGroupValid = this.impostoOuAcessoriaAnualFormGroup.valid;
                }
                break;
            case <number>TObrigacaoTipo.Relatorio:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    secondFormGroupValid = this.relatorioMensalFormGroup.valid;
                } else {
                    secondFormGroupValid = this.relatorioAnualFormGroup.valid;
                }
                break;
        }

        this.isformsValid = this.firstFormGroup.valid && secondFormGroupValid;
    }

    monitorFormChanged(form: FormGroup): void {
        form.valueChanges.subscribe((val) => {
            this.checkIfFormsAreValid();
        });
    }

    onFormChanged(): void {
        this.checkIfFormsAreValid();
    }
}
