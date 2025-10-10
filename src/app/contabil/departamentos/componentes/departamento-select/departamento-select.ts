import { Component, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBasePagingComponent } from '../../../../shared/controls/input-base-paging/input-base-paging';
import { ListItem } from '../../../../shared/models';
import { DepartamentosParameter } from '../../../models/contabil/parameters';
import { DepartamentosListItemPagingService } from '../../services/pagings';

@Component({
    selector: 'departamento-select',
    templateUrl: './departamento-select.html',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DepartamentoSelectComponent),
            multi: true,
        },
    ],
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class DepartamentoSelectComponent extends InputBasePagingComponent<ListItem> implements OnInit, ControlValueAccessor {
    private _parameters?: DepartamentosParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: DepartamentosParameter | undefined) {
        if (value == null) return;

        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        this.param.q = value.searchText;

        this.refresh();
    }

    constructor(injector: Injector, departamentosListItemPagingService: DepartamentosListItemPagingService) {
        super(injector, departamentosListItemPagingService);

        this.autoLoad = true;
    }
}
