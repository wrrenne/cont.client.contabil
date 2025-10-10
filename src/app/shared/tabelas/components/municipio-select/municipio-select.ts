import { Component, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InputBasePagingComponent } from '../../../controls/input-base-paging/input-base-paging';
import { MunicipioPageItem } from '../../models/pageItems';
import { MunicipioParameter } from '../../models/parameters';
import { MunicipiosPagingService } from '../../services/pagings/municipios.service';

@Component({
    selector: 'municipio-select',
    templateUrl: './municipio-select.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzSelectModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MunicipioSelectComponent),
            multi: true,
        },
    ],
})
export class MunicipioSelectComponent extends InputBasePagingComponent<MunicipioPageItem> implements OnInit, ControlValueAccessor {
    private _parameters: MunicipioParameter | undefined;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: MunicipioParameter | undefined) {
        if (!value || !value.uf) return;
        this._parameters = value;

        this.param.routeStrings = [];
        this.param.routeStrings.push(value.uf);

        this.param.queryStrings.clear();
        this.param.q = value.searchText;

        if (value.codigo) {
            this.param.queryStrings.set('codigo', value.codigo);
        }

        this.refresh();
    }

    constructor(injector: Injector, municipiosPagingService: MunicipiosPagingService) {
        super(injector, municipiosPagingService);
    }

    override writeValue(value: any): void {
        super.writeValue(value);

        this.parameters = { codigo: value };
    }

    onSearch(searchText: string) {
        this.parameters = {
            uf: this.parameters?.uf!,
            searchText: searchText,
        };
    }
}
