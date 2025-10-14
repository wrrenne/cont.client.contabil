import { Component, forwardRef, Injector, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBasePagingComponent } from '../../../../shared/controls/input-base-paging/input-base-paging';
import { ListItem } from '../../../../shared/models';
import { PerfisParameter } from '../../../models/obrigacoes/parameters';
import { PerfisListItemService } from '../../services/pagings/perfisListItem.service';

@Component({
    selector: 'perfil-select',
    templateUrl: './perfil-select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PerfilSelectComponent),
            multi: true,
        },
    ],
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class PerfilSelectComponent extends InputBasePagingComponent<ListItem> implements ControlValueAccessor {
    //override descriptionBase = { none: "", plural: "{0} perfis", singular: "1 perfil" }

    private _parameters?: PerfisParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: PerfisParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        this.param.routeStrings = [];

        //if (this.vars.contabilidade)
        //    this.param.routeStrings.push(this.vars.contabilidade?.id.toString())

        //this.param.routeStrings.push(this.dateUtilsService.firstDateOfCurrentMonthIso())

        this.param.q = value?.searchText;
        this.refresh();
    }

    constructor(injector: Injector, perfisSelectPagingService: PerfisListItemService) {
        super(injector, perfisSelectPagingService);
    }
}
