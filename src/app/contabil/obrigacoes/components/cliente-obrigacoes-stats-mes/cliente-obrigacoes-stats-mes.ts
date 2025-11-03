import { Component, Input } from '@angular/core';
import { ClienteObrigacoesMesView } from '../../../models/clientes/views';
import { TObrigacaoTipo } from '../../../models/enums';
import { ObrigacoesService } from '../../services/obrigacoes.service';

export class ClienteObrigacoesStatsMesParam {
    clienteId: number;
    mesInicial: Date;
    mesFinal: Date;
    tipo?: TObrigacaoTipo;
}

@Component({
    selector: 'cliente-obrigacoes-stats-mes',
    templateUrl: './cliente-obrigacoes-stats-mes.html',
})
export class ClienteObrigacoesStatsMesComponent {
    view: ClienteObrigacoesMesView;

    TObrigacaoTipo = TObrigacaoTipo;

    tipo?: TObrigacaoTipo;

    private _parameters?: ClienteObrigacoesStatsMesParam;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ClienteObrigacoesStatsMesParam | undefined) {
        this._parameters = value;
        if (value) {
            this.tipo = value.tipo;
            this.getData();
        }
    }

    constructor(private obrigacoesService: ObrigacoesService) {}

    getData() {
        this.obrigacoesService
            .clienteObrigacoesStatsMesGet(this.parameters?.clienteId!, this.parameters?.mesInicial!, this.parameters?.mesFinal!)
            .subscribe((x) => {
                this.view = x.obj;
            });
    }
}
