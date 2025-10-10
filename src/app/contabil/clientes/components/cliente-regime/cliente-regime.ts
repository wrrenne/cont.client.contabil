import { Component, Input } from '@angular/core';
import { DateUtilsService } from '../../../../shared/services';
import { ContabilClienteRegimeView } from '../../../models/clientes/views';

@Component({
    selector: 'cliente-regime',
    templateUrl: './cliente-regime.html',
    host: { 'class': 'h-[120px]' },
    standalone: true
})
export class ClienteRegimeComponent {

    private _regime: ContabilClienteRegimeView
    @Input() get regime() {
        return this._regime
    }
    set regime(value: ContabilClienteRegimeView) {
        this._regime = value
    }

    constructor(private dateUtilsService: DateUtilsService) {

    }

    getMes(data: Date): string {
        return this.dateUtilsService.getMonthName(this.dateUtilsService.convertIsoStringToDate(data.toString()))
    }
}
