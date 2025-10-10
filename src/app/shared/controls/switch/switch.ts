import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'switch',
    templateUrl: './switch.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NzSwitchModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SwitchComponent),
        multi: true
    }]
})
export class SwitchComponent extends InputBaseComponent {
    @Input() rightAlign = false
    @Input() paddingTop = false
}
