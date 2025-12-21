import { Component, EventEmitter, Injector, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InputBasePagingComponent } from '../../../controls/input-base-paging/input-base-paging';
import { UfPageItem } from '../../models/pageItems';
import { UfParameter } from '../../models/parameters';
import { UfsPagingService } from '../../services/pagings/ufs.service';

@Component({
    selector: 'uf-select',
    templateUrl: './uf-select.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzSelectModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UfSelectComponent),
            multi: true,
        },
    ],
})
export class UfSelectComponent extends InputBasePagingComponent<UfPageItem> implements OnInit, ControlValueAccessor {
    @Output() onSelected = new EventEmitter<UfPageItem>();

    set parameters(value: UfParameter | undefined) {
        this.param.routeStrings = [];
        this.param.queryStrings.clear();
        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(injector: Injector, ufsPagingService: UfsPagingService) {
        super(injector, ufsPagingService);
    }

    override ngOnInit() {
        super.ngOnInit();

        this.parameters = {};

        // Subscribe to the form control's value changes
        const control = this.form?.get(this.formControlName);
        if (control) {
            control.valueChanges.subscribe((sigla: string) => {
                const selected = this.datas.find((d) => d.sigla === sigla);
                if (selected) {
                    this.onSelected.emit(selected);
                }
            });
        }
    }
}
