import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ListItem } from '../../models';
import { InputBaseComponent } from '../input-base/input-base';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'input-select-ex',
    templateUrl: './input-select-ex.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSelectModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputSelectExComponent),
        multi: true
    }]
})
export class InputSelectExComponent extends InputBaseComponent {

    @Input() showSearch = true
    @Input() datas: ListItem[]

    @Output() onChanged = new EventEmitter<ListItem>()

    selectChange(e: any) {
        this.onChanged.emit(e)
    }
}
