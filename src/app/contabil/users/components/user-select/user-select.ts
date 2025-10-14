import { Component, forwardRef, Injector, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InputBasePagingComponent } from '../../../../shared/controls/input-base-paging/input-base-paging';
import { ContabilUserPageItem } from '../../../models/users/pageItems';
import { SistemaUsersParameter } from '../../../models/users/parameters';
import { ObrigacoesUtilsService } from '../../../obrigacoes/services/obrigacoesUtils.service';
import { CadastroUsersService } from '../../services/pagings/cadastroUsersGet.service';

@Component({
    selector: 'user-select',
    templateUrl: './user-select.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzSelectModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UserSelectComponent),
            multi: true,
        },
    ],
})
export class UserSelectComponent extends InputBasePagingComponent<ContabilUserPageItem> implements ControlValueAccessor {
    //override descriptionBase = { none: "", plural: "{0} usuários", singular: "1 usuário" }

    //@Input() form: any
    //@Input() formControlName: any

    //value: number

    //disabled = false
    private _parameters?: SistemaUsersParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: SistemaUsersParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        this.param.routeStrings = [];

        //if (this.vars.contabilidade)
        //    this.param.routeStrings.push(this.vars.contabilidade?.id.toString())

        this.param.routeStrings.push(this.dateUtilsService.firstDateOfCurrentMonthIso());

        this.param.q = value?.searchText;
        this.refresh();
    }

    constructor(
        injector: Injector,
        cadastroUsersService: CadastroUsersService,
        public obrigacoesUtilsService: ObrigacoesUtilsService,
    ) {
        super(injector, cadastroUsersService);
    }
}
