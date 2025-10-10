import { Component, EventEmitter, Injector, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBasePagingComponent } from '../../../controls/input-base-paging/input-base-paging';
import { SistemaRevendaPageItem } from '../../models/pagings';
import { RevendaProdutosPagingService } from '../../services/pagings/revendaProdutos.service';

@Component({
    selector: 'sistema-select',
    templateUrl: './sistema-select.html',
    standalone: true,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SistemaSelectComponent),
        multi: true
    }]
})
export class SistemaSelectComponent extends InputBasePagingComponent<SistemaRevendaPageItem> implements OnInit, ControlValueAccessor {

    @Output() onClick = new EventEmitter<number>()

    //private _parameters?: SistemaRevendasParameter
    //@Input() get parameters() {
    //    return this._parameters
    //}
    //set parameters(value: SistemaRevendasParameter | undefined) {

    //    if (value == null) return

    //    this._parameters = value

    //    this.param.routeStrings = []
    //    this.param.routeStrings.push(value.revendaId.toString())

    //    this.param.queryStrings.clear()

    //    this.refresh()
    //}

    constructor(
        injector: Injector,
        revendaProdutosPagingService: RevendaProdutosPagingService
    ) {
        super(
            injector,
            revendaProdutosPagingService
        )

        this.autoLoad = true
    }
}
