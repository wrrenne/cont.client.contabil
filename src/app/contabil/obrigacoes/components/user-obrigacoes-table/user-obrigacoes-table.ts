import { Component, Injector, Input } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ButtonSelectionComponent } from 'src/app/shared/controls/button-selection/button-selection';
import { MonthSelectComponent } from 'src/app/shared/controls/month-select/month-select';
import { TSetor } from '../../../../shared/enums';
import { PagingBase } from '../../../../shared/models';
import { TEsfera, TObrigacaoClientePeriodoPor, TObrigacaoTipo } from '../../../models/enums';
import { ObrigacaoClientePeriodoPageItem } from '../../../models/obrigacoes/pagings/obrigacaoClientePeriodoPageItem';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { UserObrigacoesMesPagingService } from '../../services/pagings/userObrigacoesMes.service';
import { ObrigacaoItem } from '../obrigacao-item/obrigacao-item';

@Component({
    selector: 'user-obrigacoes-table',
    templateUrl: './user-obrigacoes-table.html',
    imports: [InfiniteScrollDirective, ButtonSelectionComponent, MonthSelectComponent, ObrigacaoItem],
})
export class UserObrigacoesTableComponent extends PagingBase<ObrigacaoClientePeriodoPageItem> {
    tab_obrigacoes = 0;
    tab_obrigacaoClientePeriodo = 1;
    tabIndex = 0;
    TObrigacaoClientePeriodoPor = TObrigacaoClientePeriodoPor;

    TObrigacaoTipo = TObrigacaoTipo;
    //selectedIndex = 0
    obrigacaoTipo: TObrigacaoTipo = TObrigacaoTipo.Imposto;

    current = this.tab_obrigacoes;

    obrigacaoClientePeriodoId?: number;

    @Input() link: string;

    public _parameters?: ObrigacoesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        if (!value) return;

        this._parameters = value;

        this.param.routeStrings = [];
        this.param.routeStrings.push((<number>value.userId).toString());
        this.param.routeStrings.push(this.dateUtilsService.GetDateIsoString(value.mes!));
        this.param.routeStrings.push(value.tipo!.toString());

        this.param.queryStrings.clear();

        if (value?.perfilItemId != undefined) {
            this.param.queryStrings.set('pi', value.perfilItemId);
        }

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(injector: Injector, userObrigacoesMesPagingService: UserObrigacoesMesPagingService) {
        super(injector, userObrigacoesMesPagingService);
    }

    getObrigacaoTipoCor(tipo: TObrigacaoTipo): string {
        switch (tipo) {
            case TObrigacaoTipo.Imposto:
                return 'red';
            case TObrigacaoTipo.Acessoria:
                return 'blue';
            case TObrigacaoTipo.Relatorio:
                return 'green';
        }

        return '';
    }

    getObrigacaoSetorCss(tipo: TSetor): string {
        switch (tipo) {
            case TSetor.Fiscal:
                return 'bg-red-600';
            case TSetor.Contabil:
                return 'bg-blue-600';
            case TSetor.Pessoal:
                return 'bg-green-600';
        }

        return '';
    }

    getObrigacaoEsferaCss(tipo: TEsfera): string {
        switch (tipo) {
            case TEsfera.Municipal:
                return 'bg-indigo-600';
            case TEsfera.Estadual:
                return 'bg-pink-600';
            case TEsfera.Federal:
                return 'bg-purple-600';
        }
    }

    enc(id: number) {
        return this.encryptionService.encrypt(id);
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
        var c = this.parameters;
        c!.mes = date;

        this.parameters = c;
    }

    tipoClicked(e: any) {
        //this.selectedIndex = e
        this.tipoApply(e);
    }

    tipoApply(t: TObrigacaoTipo) {
        var c = this.parameters;

        c!.tipo = t;
        //var c = this.parameters

        //switch (i) {
        //    case 0: c!.tipo = TObrigacaoTipo.Imposto
        //        break;
        //    case 1: c!.tipo = TObrigacaoTipo.Acessoria
        //        break;
        //    case 2: c!.tipo = TObrigacaoTipo.Relatorio
        //        break;
        //}

        this.parameters = c;
    }
}
