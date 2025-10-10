import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';


@Component({
    selector: 'input-time-ex',
    templateUrl: './input-time-ex.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzTimePickerModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputTimeExComponent),
        multi: true
    }]
})
export class InputTimeExComponent extends InputBaseComponent {
}
