import { Component, Input } from '@angular/core';
import { ContabilClienteDatasView } from '../../../models/clientes/views';
import { DateUtilsService } from '../../../../shared/services';
import { ObrigacoesStat } from '../../../models/obrigacoes';

@Component({
    selector: 'cliente-datas',
    templateUrl: './cliente-datas.html',
    styleUrls: ['./cliente-datas.scss'],
    host: { 'class': 'h-[120px]' },
    standalone: true
})
export class ClienteDatasComponent {

    @Input() obrigacoesStat: ObrigacoesStat

    private _datas: ContabilClienteDatasView
    @Input() get datas() {
        return this._datas
    }
    set datas(value: ContabilClienteDatasView) {
        this._datas = value
    }

    constructor(private dateUtilsService: DateUtilsService) {

    }

    getMes(data: Date): string {
        return this.dateUtilsService.getMonthName(this.dateUtilsService.convertIsoStringToDate(data.toString()))
    }
}
