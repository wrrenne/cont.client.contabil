import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@Component({
    selector: 'input-date-ex',
    templateUrl: './input-date-ex.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzDatePickerModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputDateExComponent),
        multi: true
    }]
})
export class InputDateExComponent extends InputBaseComponent {
}
