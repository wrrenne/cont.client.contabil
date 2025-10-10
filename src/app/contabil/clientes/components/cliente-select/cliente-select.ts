import { Component, EventEmitter, forwardRef, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBasePagingComponent } from '../../../../shared/controls/input-base-paging/input-base-paging';
import { ListItem } from '../../../../shared/models';
import { ClientesParameter } from '../../../models/clientes/parameters';
import { ClientesListItemService } from '../../services/pagings';

@Component({
    selector: 'cliente-select',
    templateUrl: './cliente-select.html',
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ClienteSelectComponent),
            multi: true
        }],
    standalone: true
})
export class ClienteSelectComponent extends InputBasePagingComponent<ListItem> implements ControlValueAccessor {

    @Output() onChanged = new EventEmitter<ListItem>()

    private _parameters?: ClientesParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: ClientesParameter | undefined) {
        if (value == undefined) return

        this._parameters = value

        this.param.routeStrings = []

        this.param.routeStrings.push(this.dateUtilsService.firstDateOfCurrentMonthIso())

        this.param.q = value?.searchText
        this.refresh()
    }

    constructor(
        injector: Injector,
        clientesListItemService: ClientesListItemService
    ) {
        super(
            injector,
            clientesListItemService
        )
    }

    clienteChanged(e: any) {
        var cliente: ListItem | undefined = this.datas.find(x => x.id == e)

        if (cliente) {
            var result: ListItem = {
                id: e,
                text: cliente?.text
            }

            this.onChanged.emit(result)
        }
    }
}
