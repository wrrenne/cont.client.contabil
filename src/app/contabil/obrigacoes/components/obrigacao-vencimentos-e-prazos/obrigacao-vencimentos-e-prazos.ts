import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { CardComponent } from 'src/app/shared/controls/card/card.component';
import { LabelTextComponent } from 'src/app/shared/controls/label-text/label-text';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { TObrigacaoTipo, TPeriodicidade } from '../../../models/enums';
import { ObrigacaoView } from '../../../models/obrigacoes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';
import { ObrigacaoVencimentosEPrazosModalComponent } from '../obrigacao-vencimentos-e-prazos-modal/obrigacao-vencimentos-e-prazos-modal';

@Component({
    selector: 'obrigacao-vencimentos-e-prazos',
    templateUrl: './obrigacao-vencimentos-e-prazos.html',
    imports: [CardComponent, LabelTextComponent, ButtonDefaultComponent],
})
export class ObrigacaoVencimentosEPrazosComponent {
    //firstFormGroup: FormGroup
    //impostoOuAcessoriaMensalFormGroup?: FormGroup
    //impostoOuAcessoriaAnualFormGroup?: FormGroup
    //relatorioMensalFormGroup?: FormGroup
    //relatorioAnualFormGroup?: FormGroup

    TPeriodicidade = TPeriodicidade;
    TObrigacaoTipo = TObrigacaoTipo;

    private _obrigacao: ObrigacaoView | undefined;
    @Input() get obrigacao() {
        return this._obrigacao;
    }
    set obrigacao(value: ObrigacaoView | undefined) {
        this._obrigacao = value;
        //this.getData(value!)
    }

    constructor(
        private obrigacoesService: ObrigacoesService,
        private formBuilder: FormBuilder,
        private notification: NzNotificationService,
        private vars: Vars,
        private dateUtilsService: DateUtilsService,
        private modalService: NzModalService,
    ) {}

    getMesDescricao(mes: number): string {
        return this.dateUtilsService.monthNamesFull[mes];
    }

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

    //getData(obrigacao: ObrigacaoView) {
    //    this.createFirstForm(obrigacao)

    //    this.impostoOuAcessoriaMensalFormGroup = undefined
    //    this.impostoOuAcessoriaAnualFormGroup = undefined
    //    this.relatorioMensalFormGroup = undefined
    //    this.relatorioAnualFormGroup = undefined

    //    if (obrigacao.impostoMensal)
    //        this.createImpostoOuAcessoriaMensalForm(obrigacao.impostoMensal)

    //    if (obrigacao.impostoAnual)
    //        this.createImpostoOuAcessoriaAnualForm(obrigacao.impostoAnual)

    //    if (obrigacao.acessoriaMensal)
    //        this.createImpostoOuAcessoriaMensalForm(obrigacao.acessoriaMensal)

    //    if (obrigacao.acessoriaAnual)
    //        this.createImpostoOuAcessoriaAnualForm(obrigacao.acessoriaAnual)

    //    if (obrigacao.relatorioMensal)
    //        this.createRelatorioMensalForm(obrigacao.relatorioMensal)

    //    if (obrigacao.relatorioAnual)
    //        this.createRelatorioAnualForm(obrigacao.relatorioAnual)
    //}

    //createFirstForm(obrigacao: ObrigacaoView) {
    //    this.firstFormGroup = this.formBuilder.group({
    //        descricao: [obrigacao.descricao, Validators.required],
    //    });
    //}

    //createImpostoOuAcessoriaMensalForm(view: ImpostoMensalView | AcessoriaMensalView) {
    //    this.impostoOuAcessoriaMensalFormGroup = this.formBuilder.group({
    //        vencimentoDia: [view.vencimentoDia, Validators.required],
    //        diaTipo: [view.vencimentoDiaTipo, Validators.required],
    //        prazoAntesVencimento: [view.prazoDiaAntesVencimento, Validators.required],
    //        periodoMensal: [view.periodoMensal, Validators.required],
    //        feriadoTipo: [view.feriadoTipo, Validators.required],
    //        competenciaInicial: [this.dateUtilsService.convertIsoStringToDate(view.competenciaInicial), Validators.required],
    //    });
    //}

    //createImpostoOuAcessoriaAnualForm(view: ImpostoAnualView | AcessoriaAnualView) {
    //    this.impostoOuAcessoriaAnualFormGroup = this.formBuilder.group({
    //        vencimentoDia: [view.vencimentoDia, Validators.required],
    //        diaTipo: [view.vencimentoDiaTipo, Validators.required],
    //        prazoAntesVencimento: [view.prazoDiaAntesVencimento, Validators.required],
    //        periodoAnual: [view.periodoAnual, Validators.required],
    //        feriadoTipo: [view.feriadoTipo, Validators.required],
    //        competenciaInicial: [view.competenciaAnoInicial, Validators.required],
    //        vencimentoMes: [view.vencimentoMes, Validators.required]
    //    });
    //}

    //createRelatorioMensalForm(view: RelatorioMensalView) {
    //    this.relatorioMensalFormGroup = this.formBuilder.group({
    //        prazoDia: [view.prazoDia, Validators.required],
    //        diaTipo: [view.prazoDiaTipo, Validators.required],
    //        periodoMensal: [view.periodoMensal, Validators.required],
    //        feriadoTipo: [view.feriadoTipo, Validators.required],
    //        competenciaInicial: [this.dateUtilsService.convertIsoStringToDate(view.competenciaInicial), Validators.required],
    //    });
    //}

    //createRelatorioAnualForm(view: RelatorioAnualView) {
    //    this.relatorioAnualFormGroup = this.formBuilder.group({
    //        prazoDia: [view.prazoDia, Validators.required],
    //        diaTipo: [view.prazoDiaTipo, Validators.required],
    //        periodoAnual: [view.periodoAnual, Validators.required],
    //        feriadoTipo: [view.feriadoTipo, Validators.required],
    //        competenciaInicial: [view.competenciaAnoInicial, Validators.required],
    //        prazoMes: [view.prazoMes, Validators.required]
    //    });
    //}

    //submitFirstFormGroup() {
    //    var input: ObrigacaoInput =
    //    {
    //        id: this.obrigacao?.id,
    //        descricao: this.firstFormGroup.get('descricao')?.value,
    //        userId: this.vars.user?.id!,
    //        comentario: this.firstFormGroup.get('comentario')?.value
    //    }

    //    this.obrigacoesService.obrigacaoCreateOrUpdate(input).subscribe(x => {
    //        if (x.errorMessage == null) {
    //            this.firstFormGroup.markAsPristine();
    //            this.firstFormGroup.markAsUntouched();
    //            this.firstFormGroup.updateValueAndValidity();

    //            this.createNotification()
    //        }
    //    })
    //}

    //    createNotification(): void {
    //        this.notification.create(
    //            'success',
    //            'Obrigação',
    //            'Dados atualizados com sucesso'
    //        );
    //    }

    editModal() {
        const modal = this.modalService.create({
            nzContent: ObrigacaoVencimentosEPrazosModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                id: <number>this.obrigacao?.id,
            },
        });

        modal.afterClose.subscribe((r) => this.getData(r));
    }

    getData(id: number) {
        this.obrigacoesService.obrigacaoGet(id).subscribe((x) => {
            this.obrigacao = x.obj;
        });
    }
}
