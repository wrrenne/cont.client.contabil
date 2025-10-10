import { Component, Inject, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { DiaTipoSelectComponent } from 'src/app/contabil/components/dia-tipo-select/dia-tipo-select';
import { FeriadoTipoSelectComponent } from 'src/app/contabil/components/feriado-tipo-select/feriado-tipo-select';
import { MesSelectComponent } from 'src/app/contabil/components/mes-select/mes-select';
import { PeriodoAnualSelectComponent } from 'src/app/contabil/components/periodo-anual-select/periodo-anual-select';
import { PeriodoMensalSelectComponent } from 'src/app/contabil/components/periodo-mensal-select/periodo-mensal-select';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { InputMonthYearExComponent } from 'src/app/shared/controls/input-month-year-ex/input-month-year-ex';
import { InputSelectNumberExComponent } from 'src/app/shared/controls/input-select-number-ex/input-select-number-ex';
import { InputYearExComponent } from 'src/app/shared/controls/input-year-ex/input-year-ex';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { TObrigacaoTipo, TPeriodicidade } from '../../../models/enums';
import {
    AcessoriaAnualInput,
    AcessoriaMensalInput,
    ImpostoAnualInput,
    ImpostoMensalInput,
    ObrigacaoInput,
    RelatorioAnualInput,
    RelatorioMensalInput,
} from '../../../models/obrigacoes/inputs';
import {
    AcessoriaAnualView,
    AcessoriaMensalView,
    ImpostoAnualView,
    ImpostoMensalView,
    ObrigacaoView,
    RelatorioAnualView,
    RelatorioMensalView,
} from '../../../models/obrigacoes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';

@Component({
    selector: 'obrigacao-vencimentos-e-prazos-modal',
    templateUrl: './obrigacao-vencimentos-e-prazos-modal.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ModalBaseComponent,
        InputSelectNumberExComponent,
        ButtonDefaultComponent,
        PeriodoMensalSelectComponent,
        DiaTipoSelectComponent,
        FeriadoTipoSelectComponent,
        InputMonthYearExComponent,
        PeriodoAnualSelectComponent,
        MesSelectComponent,
        InputYearExComponent,
    ],
})
export class ObrigacaoVencimentosEPrazosModalComponent extends ModalBaseComponent {
    impostoOuAcessoriaMensalFormGroup?: FormGroup;
    impostoOuAcessoriaAnualFormGroup?: FormGroup;
    relatorioMensalFormGroup?: FormGroup;
    relatorioAnualFormGroup?: FormGroup;

    isformsValid = false;

    obrigacao: ObrigacaoView;

    private _obrigacaoId: number | undefined;
    @Input() get obrigacaoId() {
        return this._obrigacaoId;
    }
    set obrigacaoId(value: number | undefined) {
        if (!value) return;

        this._obrigacaoId = value;
        this.getData(<number>value);
    }

    constructor(
        injector: Injector,
        private router: Router,
        private formBuilder: FormBuilder,
        private obrigacoesService: ObrigacoesService,
        private encryptionService: EncryptionService,
        private vars: Vars,
        private dateUtilsService: DateUtilsService,
        @Inject(NZ_MODAL_DATA) data: any,
    ) {
        super(injector);
        this.obrigacaoId = data.id;
    }

    createForm(obrigacao: ObrigacaoView) {
        this.impostoOuAcessoriaMensalFormGroup = undefined;
        this.impostoOuAcessoriaAnualFormGroup = undefined;
        this.relatorioMensalFormGroup = undefined;
        this.relatorioAnualFormGroup = undefined;

        if (obrigacao.impostoMensal) this.createImpostoOuAcessoriaMensalForm(obrigacao.impostoMensal);

        if (obrigacao.impostoAnual) this.createImpostoOuAcessoriaAnualForm(obrigacao.impostoAnual);

        if (obrigacao.acessoriaMensal) this.createImpostoOuAcessoriaMensalForm(obrigacao.acessoriaMensal);

        if (obrigacao.acessoriaAnual) this.createImpostoOuAcessoriaAnualForm(obrigacao.acessoriaAnual);

        if (obrigacao.relatorioMensal) this.createRelatorioMensalForm(obrigacao.relatorioMensal);

        if (obrigacao.relatorioAnual) this.createRelatorioAnualForm(obrigacao.relatorioAnual);
    }

    createImpostoOuAcessoriaMensalForm(view: ImpostoMensalView | AcessoriaMensalView) {
        this.impostoOuAcessoriaMensalFormGroup = this.formBuilder.group({
            vencimentoDia: [view.vencimentoDia, Validators.required],
            diaTipo: [view.vencimentoDiaTipo, Validators.required],
            prazoAntesVencimento: [view.prazoDiaAntesVencimento, Validators.required],
            periodoMensal: [view.periodoMensal, Validators.required],
            feriadoTipo: [view.feriadoTipo, Validators.required],
            competenciaInicial: [this.dateUtilsService.convertIsoStringToDate(view.competenciaInicial), Validators.required],
        });
    }

    createImpostoOuAcessoriaAnualForm(view: ImpostoAnualView | AcessoriaAnualView) {
        this.impostoOuAcessoriaAnualFormGroup = this.formBuilder.group({
            vencimentoDia: [view.vencimentoDia, Validators.required],
            diaTipo: [view.vencimentoDiaTipo, Validators.required],
            prazoAntesVencimento: [view.prazoDiaAntesVencimento, Validators.required],
            periodoAnual: [view.periodoAnual, Validators.required],
            feriadoTipo: [view.feriadoTipo, Validators.required],
            competenciaInicial: [view.competenciaAnoInicial, Validators.required],
            vencimentoMes: [view.vencimentoMes, Validators.required],
        });
    }

    createRelatorioMensalForm(view: RelatorioMensalView) {
        this.relatorioMensalFormGroup = this.formBuilder.group({
            prazoDia: [view.prazoDia, Validators.required],
            diaTipo: [view.prazoDiaTipo, Validators.required],
            periodoMensal: [view.periodoMensal, Validators.required],
            feriadoTipo: [view.feriadoTipo, Validators.required],
            competenciaInicial: [this.dateUtilsService.convertIsoStringToDate(view.competenciaInicial), Validators.required],
        });
    }

    createRelatorioAnualForm(view: RelatorioAnualView) {
        this.relatorioAnualFormGroup = this.formBuilder.group({
            prazoDia: [view.prazoDia, Validators.required],
            diaTipo: [view.prazoDiaTipo, Validators.required],
            periodoAnual: [view.periodoAnual, Validators.required],
            feriadoTipo: [view.feriadoTipo, Validators.required],
            competenciaInicial: [view.competenciaAnoInicial, Validators.required],
            prazoMes: [view.prazoMes, Validators.required],
        });
    }

    submit() {
        var impostoMensal: ImpostoMensalInput | undefined = undefined;
        var impostoAnual: ImpostoAnualInput | undefined = undefined;
        var acessoriaMensal: AcessoriaMensalInput | undefined = undefined;
        var acessoriaAnual: AcessoriaAnualInput | undefined = undefined;
        var relatorioMensal: RelatorioMensalInput | undefined = undefined;
        var relatorioAnual: RelatorioAnualInput | undefined = undefined;

        var periodicidade = this.obrigacao.periodicidade;
        var comentario = '';

        switch (this.obrigacao.tipo) {
            case <number>TObrigacaoTipo.Imposto:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    impostoMensal = {
                        //competenciaInicial: this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.impostoOuAcessoriaMensalFormGroup.get('competenciaInicial')?.value)),
                        vencimentoDia: this.impostoOuAcessoriaMensalFormGroup?.get('vencimentoDia')?.value,
                        vencimentoDiaTipo: this.impostoOuAcessoriaMensalFormGroup?.get('diaTipo')?.value,
                        prazoDiaAntesVencimento: this.impostoOuAcessoriaMensalFormGroup?.get('prazoAntesVencimento')?.value,
                        periodoMensal: this.impostoOuAcessoriaMensalFormGroup?.get('periodoMensal')?.value,
                        feriadoTipo: this.impostoOuAcessoriaMensalFormGroup?.get('feriadoTipo')?.value,
                    };

                    comentario = this.impostoOuAcessoriaMensalFormGroup?.get('comentario')?.value;
                } else {
                    //var competenciaAnoInicial = this.dateUtilsService.getYear(this.impostoOuAcessoriaAnualFormGroup?.get('competenciaInicial')?.value)

                    impostoAnual = {
                        //competenciaAnoInicial: competenciaAnoInicial,
                        vencimentoDia: this.impostoOuAcessoriaAnualFormGroup?.get('vencimentoDia')?.value,
                        vencimentoDiaTipo: this.impostoOuAcessoriaAnualFormGroup?.get('diaTipo')?.value,
                        prazoDiaAntesVencimento: this.impostoOuAcessoriaAnualFormGroup?.get('prazoAntesVencimento')?.value,
                        periodoAnual: this.impostoOuAcessoriaAnualFormGroup?.get('periodoAnual')?.value,
                        feriadoTipo: this.impostoOuAcessoriaAnualFormGroup?.get('feriadoTipo')?.value,
                        vencimentoMes: this.impostoOuAcessoriaAnualFormGroup?.get('vencimentoMes')?.value,
                    };

                    comentario = this.impostoOuAcessoriaAnualFormGroup?.get('comentario')?.value;
                }
                break;
            case <number>TObrigacaoTipo.Acessoria:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    acessoriaMensal = {
                        //competenciaInicial: this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.impostoOuAcessoriaMensalFormGroup.get('competenciaInicial')?.value)),
                        vencimentoDia: this.impostoOuAcessoriaMensalFormGroup?.get('vencimentoDia')?.value,
                        vencimentoDiaTipo: this.impostoOuAcessoriaMensalFormGroup?.get('diaTipo')?.value,
                        prazoDiaAntesVencimento: this.impostoOuAcessoriaMensalFormGroup?.get('prazoAntesVencimento')?.value,
                        periodoMensal: this.impostoOuAcessoriaMensalFormGroup?.get('periodoMensal')?.value,
                        feriadoTipo: this.impostoOuAcessoriaMensalFormGroup?.get('feriadoTipo')?.value,
                    };

                    comentario = this.impostoOuAcessoriaMensalFormGroup?.get('comentario')?.value;
                } else {
                    //var competenciaAnoInicial = this.dateUtilsService.getYear(this.impostoOuAcessoriaAnualFormGroup.get('competenciaInicial')?.value)

                    acessoriaAnual = {
                        //competenciaAnoInicial: competenciaAnoInicial,
                        vencimentoDia: this.impostoOuAcessoriaAnualFormGroup?.get('vencimentoDia')?.value,
                        vencimentoDiaTipo: this.impostoOuAcessoriaAnualFormGroup?.get('diaTipo')?.value,
                        prazoDiaAntesVencimento: this.impostoOuAcessoriaAnualFormGroup?.get('prazoAntesVencimento')?.value,
                        periodoAnual: this.impostoOuAcessoriaAnualFormGroup?.get('periodoAnual')?.value,
                        feriadoTipo: this.impostoOuAcessoriaAnualFormGroup?.get('feriadoTipo')?.value,
                        vencimentoMes: this.impostoOuAcessoriaAnualFormGroup?.get('vencimentoMes')?.value,
                    };

                    comentario = this.impostoOuAcessoriaAnualFormGroup?.get('comentario')?.value;
                }
                break;
            case <number>TObrigacaoTipo.Relatorio:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    relatorioMensal = {
                        //competenciaInicial: this.dateUtilsService.GetDateIsoString(this.dateUtilsService.firstDateOfMonth(this.relatorioMensalFormGroup.get('competenciaInicial')?.value)),
                        prazoDia: this.relatorioMensalFormGroup?.get('prazoDia')?.value,
                        prazoDiaTipo: this.relatorioMensalFormGroup?.get('prazoDiaTipo')?.value,
                        periodoMensal: this.relatorioMensalFormGroup?.get('periodoMensal')?.value,
                        feriadoTipo: this.relatorioMensalFormGroup?.get('feriadoTipo')?.value,
                    };

                    comentario = this.relatorioMensalFormGroup?.get('comentario')?.value;
                } else {
                    //var competenciaInicial = this.dateUtilsService.getYear(this.relatorioAnualFormGroup.get('competenciaInicial')?.value)

                    relatorioAnual = {
                        //competenciaAnoInicial: competenciaInicial,
                        prazoDia: this.relatorioAnualFormGroup?.get('prazoDia')?.value,
                        prazoDiaTipo: this.relatorioAnualFormGroup?.get('diaTipo')?.value,
                        periodoAnual: this.relatorioAnualFormGroup?.get('periodoAnual')?.value,
                        feriadoTipo: this.relatorioAnualFormGroup?.get('feriadoTipo')?.value,
                        prazoMes: this.relatorioAnualFormGroup?.get('prazoMes')?.value,
                    };

                    comentario = this.relatorioAnualFormGroup?.get('comentario')?.value;
                }
                break;
        }

        var input: ObrigacaoInput = {
            id: this.obrigacao.id,
            cadastroId: this.vars.cadastro?.id!,
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
        var periodicidade = this.obrigacao.periodicidade;

        switch (this.obrigacao.tipo) {
            case <number>TObrigacaoTipo.Imposto:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    this.isformsValid = this.impostoOuAcessoriaMensalFormGroup?.valid!;
                } else {
                    this.isformsValid = this.impostoOuAcessoriaAnualFormGroup?.valid!;
                }
                break;

            case <number>TObrigacaoTipo.Acessoria:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    this.isformsValid = this.impostoOuAcessoriaMensalFormGroup?.valid!;
                } else {
                    this.isformsValid = this.impostoOuAcessoriaAnualFormGroup?.valid!;
                }
                break;
            case <number>TObrigacaoTipo.Relatorio:
                if (periodicidade == <number>TPeriodicidade.Mensal) {
                    this.isformsValid = this.relatorioMensalFormGroup?.valid!;
                } else {
                    this.isformsValid = this.relatorioAnualFormGroup?.valid!;
                }
                break;
        }
    }

    monitorFormChanged(form: FormGroup): void {
        form.valueChanges.subscribe((val) => {
            this.checkIfFormsAreValid();
        });
    }

    onFormChanged(): void {
        this.checkIfFormsAreValid();
    }

    getData(id: number) {
        this.obrigacoesService.obrigacaoGet(id).subscribe((x) => {
            this.obrigacao = x.obj;
            this.title = this.obrigacao.descricao;
            this.subTitle = this.obrigacao.tipoDescricao;
            this.createForm(this.obrigacao);
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
        //    return this.encryptionService.set(id)
    }
}
