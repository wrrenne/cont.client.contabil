import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InputBasePagingComponent } from '../../../../shared/controls/input-base-paging/input-base-paging';
import { TObrigacaoTipo } from '../../../models/enums';
import { ObrigacaoListItem } from '../../../models/obrigacoes';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesListItemService } from '../../services/pagings/obrigacoesListItem.service';

@Component({
    selector: 'obrigacao-select',
    templateUrl: './obrigacao-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ObrigacaoSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, NzSelectModule],
})
export class ObrigacaoSelectComponent extends InputBasePagingComponent<ObrigacaoListItem> implements ControlValueAccessor {
    //override descriptionBase = { none: "", plural: "{0} obrigações", singular: "1 obrigação" }

    @Output() onChanged = new EventEmitter<ObrigacaoListItem>();

    private _parameters?: ObrigacoesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ObrigacoesParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear;

        if (value.tipo) this.param.queryStrings.set('tipo', value.tipo);

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(injector: Injector, obrigacoesListItemService: ObrigacoesListItemService) {
        super(injector, obrigacoesListItemService);
    }

    obrigacaoChanged(e: any) {
        var obrigacao: ObrigacaoListItem | undefined = this.datas.find((x) => x.id == e);

        if (obrigacao) {
            var result: ObrigacaoListItem = {
                id: e,
                periodicidade: obrigacao.periodicidade!,
                text: obrigacao?.text,
                tipo: obrigacao?.tipo,
                departamentoId: obrigacao?.departamentoId,
                departamentoNome: obrigacao?.departamentoNome,
            };

            this.onChanged.emit(result);
        }
    }

    getObrigacaoTipoCor(tipo: TObrigacaoTipo): string {
        switch (tipo) {
            case TObrigacaoTipo.Imposto:
                return 'text-red-600';
            case TObrigacaoTipo.Acessoria:
                return 'text-blue-600';
            case TObrigacaoTipo.Relatorio:
                return 'text-green-600';
        }

        return '';
    }
}
