import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base';
import { CommonModule } from '@angular/common';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
    selector: 'input-textarea-ex',
    templateUrl: './input-textarea-ex.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CdkTextareaAutosize],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputTextAreaExComponent),
        multi: true
    }]
})
export class InputTextAreaExComponent extends InputBaseComponent {
    @Input() noBorder = false
}
