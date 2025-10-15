import { Component, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { TTipoPessoa } from '../../../shared/enums';
import { TRegime } from '../../models/enums';

@Component({
    selector: 'regime-select',
    templateUrl: './regime-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RegimeSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzRadioModule],
})
export class RegimeSelectComponent extends InputBaseComponent {
    @Input() TipoPessoa: TTipoPessoa | undefined;

    public TRegime = TRegime;

    TTipoPessoa = TTipoPessoa;
}
