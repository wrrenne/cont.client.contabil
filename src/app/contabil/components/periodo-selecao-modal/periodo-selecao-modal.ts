import { Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { InputMonthYearExComponent } from 'src/app/shared/controls/input-month-year-ex/input-month-year-ex';
import { InputYearExComponent } from 'src/app/shared/controls/input-year-ex/input-year-ex';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { DateUtilsService } from 'src/app/shared/services';
import { Vars } from 'src/app/shared/variables';

export enum TPeriodoSelecaoTipo {
    VencimentoMes = 1,
    CompetenciaMes = 2,
    CompetenciaAno = 3,
}

@Component({
    selector: 'periodo-selecao-modal',
    templateUrl: './periodo-selecao-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, InputMonthYearExComponent, InputYearExComponent, ButtonDefaultComponent],
})
export class PeriodoSelecaoModalComponent extends ModalBaseComponent {
    TPeriodoSelecaoTipo = TPeriodoSelecaoTipo;
    firstFormGroup: FormGroup;

    constructor(
        injector: Injector,
        private formBuilder: FormBuilder,
        private vars: Vars,
        private dateUtilsService: DateUtilsService,
    ) {
        super(injector);
        this.createForm();
        this.setupDynamicValidators();
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            option: [TPeriodoSelecaoTipo.VencimentoMes],
            vencimentoMes: [this.vars.dataInicial],
            competenciaMes: [''],
            competenciaAno: [''],
        });
    }

    setupDynamicValidators() {
        this.firstFormGroup.get('option')?.valueChanges.subscribe((selected: TPeriodoSelecaoTipo) => {
            const venc = this.firstFormGroup.get('vencimentoMes');
            const compMes = this.firstFormGroup.get('competenciaMes');
            const compAno = this.firstFormGroup.get('competenciaAno');

            // Reset validators
            venc?.clearValidators();
            compMes?.clearValidators();
            compAno?.clearValidators();

            // Apply required validator to the selected one
            if (selected === TPeriodoSelecaoTipo.VencimentoMes) venc?.addValidators(Validators.required);
            if (selected === TPeriodoSelecaoTipo.CompetenciaMes) compMes?.addValidators(Validators.required);
            if (selected === TPeriodoSelecaoTipo.CompetenciaAno) compAno?.addValidators(Validators.required);

            venc?.updateValueAndValidity();
            compMes?.updateValueAndValidity();
            compAno?.updateValueAndValidity();
        });
    }

    submitFormGroup() {
        if (this.firstFormGroup.valid) {
            const dataInicial = this.firstFormGroup.get('vencimentoMes')?.value;
            this.vars.periodo = {
                dataInicial: dataInicial,
                dataFinal: this.dateUtilsService.lastDateOfMonth(dataInicial),
            };

            this.closeModal(true);
        } else {
            this.firstFormGroup.markAllAsTouched();
        }
    }
}
