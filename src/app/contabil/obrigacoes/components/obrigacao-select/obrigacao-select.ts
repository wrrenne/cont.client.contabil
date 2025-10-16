import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ObrigacaoPageItem } from 'src/app/contabil/models/obrigacoes/pagings';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { InputBasePagingComponent } from '../../../../shared/controls/input-base-paging/input-base-paging';
import { TEsfera } from '../../../models/enums';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesPagingService } from '../../services/pagings/obrigacoes.service';

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
    imports: [FormsModule, ReactiveFormsModule, CommonModule, NzSelectModule, AvatarTitleComponent],
})
export class ObrigacaoSelectComponent extends InputBasePagingComponent<ObrigacaoPageItem> implements ControlValueAccessor {
    @Output() onChanged = new EventEmitter<ObrigacaoPageItem>();

    TEsfera = TEsfera;

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

    constructor(injector: Injector, obrigacoesPagingService: ObrigacoesPagingService) {
        super(injector, obrigacoesPagingService);
    }

    onUserSelect(e: any) {
        var obrigacao: ObrigacaoPageItem | undefined = this.datas.find((x) => x.id == e);
        this.onChanged.emit(obrigacao);
    }

    override writeValue(value: any): void {
        super.writeValue(value);

        if (value) {
            var obrigacao: ObrigacaoPageItem | undefined = this.datas.find((x) => x.id == value);

            console.log('Municipio value changed internally:', obrigacao);
        }
    }
}
