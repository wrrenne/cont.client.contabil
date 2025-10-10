import { Component, Input } from '@angular/core';
import { DateUtilsService } from '../../../../shared/services';
import { ContabilClienteCnpjCpfView, ContabilClienteRegimeView } from '../../../models/clientes/views';

@Component({
    selector: 'cliente-cnpj-cpf',
    templateUrl: './cliente-cnpj-cpf.html',
    host: { 'class': 'h-[120px]' },
    standalone: true
})
export class ClienteCnpjCpfComponent {

    private _cnpjCpf: ContabilClienteCnpjCpfView
    @Input() get cnpjCpf() {
        return this._cnpjCpf
    }
    set cnpjCpf(value: ContabilClienteCnpjCpfView) {
        this._cnpjCpf = value
    }

    constructor(private dateUtilsService: DateUtilsService) {

    }

    getMes(data: Date): string {
        return this.dateUtilsService.getMonthName(this.dateUtilsService.convertIsoStringToDate(data.toString()))
    }
}
