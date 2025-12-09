import { Component, Injector, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InputBasePagingComponent } from '../../../controls/input-base-paging/input-base-paging';
import { SistemaCadastroPageItem } from '../../models/pagings';
import { SistemaCadastrosPagingService } from '../../services/pagings/sistemaCadastros.service';

export interface CadastroSistemasParameter {
    cadastroId: number;
}

@Component({
    selector: 'cadastro-sistemas-select',
    templateUrl: './cadastro-sistemas-select.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzSelectModule],
})
export class CadastroSistemasSelectComponent extends InputBasePagingComponent<SistemaCadastroPageItem> {
    private _parameters?: CadastroSistemasParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: CadastroSistemasParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        this.param.routeStrings = [];
        this.param.routeStrings.push(value.cadastroId.toString());

        this.param.queryStrings.clear();

        this.refresh();
    }

    constructor(injector: Injector, sistemaCadastrosPagingService: SistemaCadastrosPagingService) {
        super(injector, sistemaCadastrosPagingService);
    }
}
