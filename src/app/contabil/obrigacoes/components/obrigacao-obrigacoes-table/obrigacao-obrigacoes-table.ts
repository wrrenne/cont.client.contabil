import { Component, Injector, Input } from '@angular/core';
import { TSetor } from '../../../../shared/enums';
import { PagingBase } from '../../../../shared/models';
import { TEsfera, TObrigacaoClientePeriodoPor, TObrigacaoTipo } from '../../../models/enums';
import { ObrigacaoClientePeriodoPageItem } from '../../../models/obrigacoes/pagings/obrigacaoClientePeriodoPageItem';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacaoObrigacoesMesPagingService } from '../../services/pagings/obrigacaoObrigacoesMes.service';

@Component({
    selector: 'obrigacao-obrigacoes-table',
    templateUrl: './obrigacao-obrigacoes-table.html'
})
export class ObrigacaoObrigacoesTableComponent extends PagingBase<ObrigacaoClientePeriodoPageItem> {

    //descriptionBase = { none: "", plural: "{0} obrigações", singular: "1 obrigação" }

    @Input() link: string

    //tab_obrigacoes = 0;
    //tab_obrigacaoClientePeriodo = 1;

    //current = this.tab_obrigacoes

    TObrigacaoClientePeriodoPor = TObrigacaoClientePeriodoPor

    //obrigacaoObrigacoes: ObrigacaoObrigacoesMesView

    //@ViewChild("stepper") stepper: MatStepper

    //obrigacaoClientePeriodoId?: number

    //links: NavigationLink[] = [
    //    {
    //        id: 1,
    //        icon: 'heroPlus',
    //        title: 'Nova obrigação',
    //        //handler: this.obrigacaoNovoModal.bind(this)
    //    }, {
    //        id: 2,
    //        icon: 'iconoirLink',
    //        title: 'Associar obrigação ao perfil',
    //        //handler: this.perfilObrigacaoAssociarModal.bind(this)
    //    }
    //]

    public _parameters?: ObrigacoesParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        if (value == null) return

        this._parameters = value

        this.param.routeStrings = []
        this.param.routeStrings.push((<number>value.obrigacaoId).toString())
        this.param.routeStrings.push(this.dateUtilsService.GetDateIsoString(value.mes!))

        this.param.queryStrings.clear()

        if (value?.perfilItemId != undefined) {
            this.param.queryStrings.set('pi', value.perfilItemId)
        }

        this.param.q = value?.searchText

        this.refresh()
    }

    constructor(
        injector: Injector,
        obrigacaoObrigacoesMesPagingService: ObrigacaoObrigacoesMesPagingService
    ) {
        super(
            injector,
            obrigacaoObrigacoesMesPagingService
        )
    }

    //getData() {
    //    this.obrigacoesService.obrigacaoObrigacoesMesPagingGet(this.parameters?.obrigacaoId!, this.parameters?.mes!).subscribe(x => {
    //        //this.obrigacoesService.fillAvatares(x.obj.obrigacoes)
    //        //x.obj.obrigacoesImpostos
    //        //    .forEach(y => {
    //        //        y.avatares = []
    //        //        y.responsaveis.forEach(z => y.avatares
    //        //            .push({ refId: z.userId, nome: z.userNome })
    //        //        )
    //        //    })

    //        this.obrigacaoObrigacoes = x.obj
    //    })
    //}

    //fillAvatares(obrigacoes: ObrigacaoClientePeriodoView[]) {
    //    obrigacoes
    //        .forEach(y => {
    //            y.avatares = []
    //            y.responsaveis.forEach(z => y.avatares
    //                .push({ userId: z.id, nome: z.userNome })
    //            )
    //        })
    //}

    getObrigacaoTipoCor(tipo: TObrigacaoTipo): string {
        switch (tipo) {
            case TObrigacaoTipo.Imposto: return 'red'
            case TObrigacaoTipo.Acessoria: return 'blue'
            case TObrigacaoTipo.Relatorio: return 'green'
        }

        return ''
    }

    //ngAfterViewInit(): void {
    //    this.stepperService.stepper = this.stepper
    //}

    getObrigacaoSetorCor(tipo: TSetor): string {
        switch (tipo) {
            case TSetor.Fiscal: return 'red2'
            case TSetor.Contabil: return 'blue2'
            case TSetor.Pessoal: return 'green2'
        }

        return ''
    }

    getObrigacaoEsferaCor(tipo: TEsfera): string {
        switch (tipo) {
            case TEsfera.Municipal: return 'indigo'
            case TEsfera.Estadual: return 'pink'
            case TEsfera.Federal: return 'purple'
        }
    }

    enc(id: number) {
        return this.encryptionService.encrypt(id)
    }

    monthSelected(date: Date): void {
        var c = this.parameters
        c!.mes = date

        this.parameters = c
    }

    //obrigacaoClick(obrigacaoClientePeriodoId: number) {
        //this.current = this.tab_obrigacaoClientePeriodo
        //this.stepperService.setStepperIndex(this.current)

    //    this.obrigacaoClientePeriodoId = obrigacaoClientePeriodoId
    //}

//    obrigacaoClientePeriodoBackClick() {
//        this.current = this.tab_obrigacoes
//        this.stepperService.setStepperIndex(this.current)
//    }
}
