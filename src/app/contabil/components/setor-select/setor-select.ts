import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { TSetor } from '../../../shared/enums';

@Component({
    selector: 'setor-select',
    templateUrl: './setor-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SetorSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
})
export class SetorSelectComponent extends InputBaseComponent {
    public TSetor = TSetor;
}
