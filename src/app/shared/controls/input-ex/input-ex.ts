
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base';

@Component({
    selector: 'input-ex',
    templateUrl: './input-ex.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputExComponent),
        multi: true
    }]
})
export class InputExComponent extends InputBaseComponent {

    @Input() maxlength: number | null = null
    @Input() isPassword = false

    @Output() onPressEnter = new EventEmitter<string>()

    enterPressed(e: any) {
        this.onPressEnter.emit(e.target.value);
    }

    get inputType(): string {
        return this.isPassword ? 'password' : 'text';
    }
}
