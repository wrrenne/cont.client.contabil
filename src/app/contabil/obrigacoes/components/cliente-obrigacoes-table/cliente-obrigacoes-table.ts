import { Component, Injector, Input } from '@angular/core';
import { TSetor } from '../../../../shared/enums';
import { PagingBase } from '../../../../shared/models';
import { TEsfera, TObrigacaoClientePeriodoPor, TObrigacaoTipo } from '../../../models/enums';
import { ObrigacaoClientePeriodoPageItem } from '../../../models/obrigacoes/pagings/obrigacaoClientePeriodoPageItem';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesService } from '../../services/obrigacoes.service';
import { ClienteObrigacoesMesPagingService } from '../../services/pagings/clienteObrigacoesMes.service';
import { ClienteObrigacoesStatsMesParam } from '../cliente-obrigacoes-stats-mes/cliente-obrigacoes-stats-mes';

@Component({
    selector: 'cliente-obrigacoes-table',
    templateUrl: './cliente-obrigacoes-table.html'
})
export class ClienteObrigacoesTableComponent extends PagingBase<ObrigacaoClientePeriodoPageItem> {

    tab_obrigacoes = 0;
    tab_obrigacaoClientePeriodo = 1;
    tabIndex = 0;
    TObrigacaoClientePeriodoPor = TObrigacaoClientePeriodoPor

    clienteObrigacoesStatsMesParameters: ClienteObrigacoesStatsMesParam

    TObrigacaoTipo = TObrigacaoTipo
    //selectedIndex = 0
    obrigacaoTipo: TObrigacaoTipo
    current = this.tab_obrigacoes

    obrigacaoClientePeriodoId?: number

    @Input() link: string

    //clienteObrigacoes: ClienteObrigacoesMesView

    public _parameters?: ObrigacoesParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        if (!value) return

        this._parameters = value

        this.param.routeStrings = []
        this.param.routeStrings.push((<number>value.clienteId).toString())
        this.param.routeStrings.push(this.dateUtilsService.GetDateIsoString(value.mes!))
        this.param.routeStrings.push(value.tipo!.toString())

        this.param.queryStrings.clear()

        if (value?.perfilItemId != undefined) {
            this.param.queryStrings.set('pi', value.perfilItemId)
        }

        this.param.q = value?.searchText

        this.clienteObrigacoesStatsMesParameters = {
            clienteId: value.clienteId!,
            mes: value.mes!,
            tipo: value.tipo
        }

        this.refresh()
    }

    constructor(
        injector: Injector,
        clienteObrigacoesMesPagingService: ClienteObrigacoesMesPagingService,
        private obrigacoesService: ObrigacoesService) {
        super(
            injector,
            clienteObrigacoesMesPagingService
        )
    }

    //getData() {
    //    this.obrigacoesService.clienteObrigacoesMesPagingGet(this.parameters?.clienteId!, this.parameters?.mes!).subscribe(x => {
    //        //this.obrigacoesService.fillAvatares(x.obj.obrigacoesImpostos)
    //        //this.obrigacoesService.fillAvatares(x.obj.obrigacoesAcessorias)
    //        //this.obrigacoesService.fillAvatares(x.obj.obrigacoesRelatorios)

    //        this.clienteObrigacoes = x.obj
    //    })
    //}

    //fillAvatares(obrigacoes: ObrigacaoClientePeriodoView[]) {
    //    obrigacoes
    //        .forEach(y => {
    //            y.avatares = []
    //            y.responsaveis.forEach(z => y.avatares
    //                .push({ refId: z.userId, nome: z.userNome })
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

    getObrigacaoSetorCss(tipo: TSetor): string {
        switch (tipo) {
            case TSetor.Fiscal: return 'bg-red-600'
            case TSetor.Contabil: return 'bg-blue-600'
            case TSetor.Pessoal: return 'bg-green-600'
        }

        return ''
    }

    getObrigacaoEsferaCss(tipo: TEsfera): string {
        switch (tipo) {
            case TEsfera.Municipal: return 'bg-indigo-600'
            case TEsfera.Estadual: return 'bg-pink-600'
            case TEsfera.Federal: return 'bg-purple-600'
        }
    }

    enc(id: number) {
        return this.encryptionService.encrypt(id)
    }

    obrigacaoClick(obrigacaoClientePeriodoId: number) {
    //    this.current = this.tab_obrigacaoClientePeriodo
    //    this.stepperService.setStepperIndex(this.current)

    //    this.obrigacaoClientePeriodoId = obrigacaoClientePeriodoId
    }

    obrigacaoClientePeriodoBackClick() {
    //    this.current = this.tab_obrigacoes
    //    this.stepperService.setStepperIndex(this.current)
    }

    monthSelected(date: Date): void {
        var c = this.parameters
        c!.mes = date

        this.parameters = c
    }

    tipoClicked(e: any) {
        this.obrigacaoTipo = e
        this.tipoApply(e)
    }

    tipoApply(tipo: TObrigacaoTipo) {
        var c = this.parameters

        c!.tipo = tipo

        this.parameters = c
    }

    onTabChange(e: any) {

        var tipo: TObrigacaoTipo = TObrigacaoTipo.Imposto

        switch (e) {
            case 0: tipo = TObrigacaoTipo.Imposto; break;
            case 1: tipo = TObrigacaoTipo.Acessoria; break;
            case 2: tipo = TObrigacaoTipo.Relatorio; break;
        }

        this.parameters = {clienteId: this.parameters?.clienteId, mes: this.parameters?.mes, tipo: tipo}
    }
}
