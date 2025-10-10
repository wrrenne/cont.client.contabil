import { Component, forwardRef, Injector, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputBasePagingComponent } from '../../../../shared/controls/input-base-paging/input-base-paging';
import { Vars } from '../../../variables';
import { PastaPageItem } from '../../models/pagings';
import { PastasParameter } from '../../models/parameters';
import { PlanoContasPagingService } from '../../services/pagings/planoContas.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'folder-select',
    templateUrl: './folder-select.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NzSelectModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FolderSelectComponent),
        multi: true
    }]
})
export class FolderSelectComponent extends InputBasePagingComponent<PastaPageItem> implements ControlValueAccessor {

    @Input() codigoAsId = true

    private _parameters?: PastasParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: PastasParameter | undefined) {
        if (value == undefined) return

        this._parameters = value

        this.param.routeStrings = []
        this.param.routeStrings.push(value.cadastroId!.toString())
        this.param.routeStrings.push((this.vars.user?.id!).toString())

        this.param.q = value?.searchText
        this.refresh()
    }

    constructor(
        injector: Injector,
        planoContasPagingService: PlanoContasPagingService,
        private vars: Vars
    ) {
        super(
            injector,
            planoContasPagingService
        )
    }

    getColor(nivel: number): string {
        switch (nivel) {
            case 1:
                return 'text-blue-500'
            case 2:
                return 'text-yellow-500'
            default:
                return ''
        }
    }

    compareFn = (o1: any, o2: any): boolean => o1 && o2 ? o1 === o2 : o1 === o2;
}
