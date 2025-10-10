import { Component, Input } from '@angular/core';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { DateUtilsService } from '../../../../shared/services';
import { ObrigacaoView } from '../../../models/obrigacoes/views';
import { ObrigacaoResumoChartConcluidosComponent } from '../obrigacao-resumo-chart-concluidos/obrigacao-resumo-chart-concluidos';

@Component({
    selector: 'obrigacao-resumo-datas',
    templateUrl: './obrigacao-resumo-datas.html',
    styleUrls: ['./obrigacao-resumo-datas.scss'],
    host: { class: 'h-[120px]' },
    imports: [ObrigacaoResumoChartConcluidosComponent, WidgetComponent],
})
export class ObrigacaoResumoDatasComponent {
    private _obrigacao: ObrigacaoView;
    @Input() get obrigacao() {
        return this._obrigacao;
    }
    set obrigacao(value: ObrigacaoView) {
        this._obrigacao = value;
    }

    constructor(private dateUtilsService: DateUtilsService) {}

    getMes(data: Date): string {
        return this.dateUtilsService.getMonthName(this.dateUtilsService.convertIsoStringToDate(data.toString()));
    }
}
