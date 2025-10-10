import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { TSetor } from '../../../../shared/enums';
import { PagingBase } from '../../../../shared/models';
import { TEsfera, TObrigacaoTipo } from '../../../models/enums';
import { ObrigacaoPageItem } from '../../../models/obrigacoes/pagings';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesPagingService } from '../../services/pagings/obrigacoes.service';
import { SystemUtilsService } from '../../../../shared/services';

@Component({
    selector: 'obrigacoes-sidebar',
    templateUrl: './obrigacoes-sidebar.html'
})
export class ObrigacoesSidebarComponent extends PagingBase<ObrigacaoPageItem> implements OnInit {

    descriptionBase = { none: "", plural: "{0} obrigações", singular: "1 obrigação" }

    @Input() link: string
    @Output() onClick = new EventEmitter<number>()

    private _parameters?: ObrigacoesParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        if (!value) return

        if (this.systemUtilsService.compare(value, this.parameters)) return;

        this._parameters = value

        this.param.routeStrings = []

        this.param.queryStrings.clear()

        if (value?.perfilItemId != undefined) {
            this.param.queryStrings.set('pi', value.perfilItemId)
        }

        //if (this.vars.dataFinal != null)
        //    this.param.queryStrings.set('dataAtivo', this.dateUtilsService.GetDateIsoString(this.vars.dataFinal))

        this.param.q = value?.searchText

        this.refresh()
    }

    constructor(
        injector: Injector,
        obrigacoesPagingService: ObrigacoesPagingService,
        private systemUtilsService: SystemUtilsService
    ) {
        super(
            injector,
            obrigacoesPagingService
        )
    }

    getObrigacaoTipoCor(tipo: TObrigacaoTipo): string {
        switch (tipo) {
            case TObrigacaoTipo.Imposto: return 'red'
            case TObrigacaoTipo.Acessoria: return 'blue'
            case TObrigacaoTipo.Relatorio: return 'green'
        }

        return ''
    }

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

    getEnc(id: number) {
        return this.encryptionService.encrypt(id)
    }
}
