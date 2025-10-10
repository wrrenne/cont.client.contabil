import { Component, Input } from '@angular/core';
import { ClienteObrigacoesMesView } from '../../../models/clientes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';
import { TObrigacaoTipo } from '../../../models/enums';

export class ClienteObrigacoesStatsMesParam {
    clienteId: number
    mes: Date
    tipo?: TObrigacaoTipo
}

@Component({
    selector: 'cliente-obrigacoes-stats-mes',
    templateUrl: './cliente-obrigacoes-stats-mes.html'
})
export class ClienteObrigacoesStatsMesComponent {

    view: ClienteObrigacoesMesView

    TObrigacaoTipo = TObrigacaoTipo

    tipo?: TObrigacaoTipo

    private _parameters?: ClienteObrigacoesStatsMesParam
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: ClienteObrigacoesStatsMesParam | undefined) {
        this._parameters = value
        if (value) {
            this.tipo = value.tipo
            this.getData()
        }
    }

    constructor(
        private obrigacoesService: ObrigacoesService
    ) {
    }

    getData() {
        this.obrigacoesService.clienteObrigacoesStatsMesGet(this.parameters?.clienteId!, this.parameters?.mes! ).subscribe(x => {
            this.view = x.obj
        })
    }
}
