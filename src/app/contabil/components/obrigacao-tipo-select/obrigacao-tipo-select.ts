import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { TObrigacaoTipo } from '../../models/enums';

@Component({
    selector: 'obrigacao-tipo-select',
    templateUrl: './obrigacao-tipo-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ObrigacaoTipoSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
})
export class ObrigacaoTipoSelectComponent extends InputBaseComponent {
    TObrigacaoTipo = TObrigacaoTipo;
}
