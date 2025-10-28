import { Component, Injector, Input } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PagingBase } from '../../../../shared/models';
import { TObrigacaoClientePeriodoPor } from '../../../models/enums';
import { ObrigacaoClientePeriodoPageItem } from '../../../models/obrigacoes/pagings/obrigacaoClientePeriodoPageItem';
import { ObrigacaoObrigacoesMesPagingService } from '../../services/pagings/obrigacaoObrigacoesMes.service';
import { ObrigacaoItem } from '../obrigacao-item/obrigacao-item';
import { ObrigacoesControl } from '../obrigacoes-control/obrigacoes-control';

@Component({
    selector: 'obrigacao-obrigacoes',
    standalone: true,
    imports: [InfiniteScrollDirective, ObrigacaoItem, ObrigacoesControl],
    templateUrl: './obrigacao-obrigacoes-table.html',
})
export class ObrigacaoObrigacoesTableComponent extends PagingBase<ObrigacaoClientePeriodoPageItem> {
    @Input() link: string;

    TObrigacaoClientePeriodoPor = TObrigacaoClientePeriodoPor;

    constructor(injector: Injector, obrigacaoObrigacoesMesPagingService: ObrigacaoObrigacoesMesPagingService) {
        super(injector, obrigacaoObrigacoesMesPagingService);
    }

    // monthSelected(date: Date): void {
    //     var c = this.parameters;
    //     c!.mes = date;

    //     this.parameters = c;
    // }

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
