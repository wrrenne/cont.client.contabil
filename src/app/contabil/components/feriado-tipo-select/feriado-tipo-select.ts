import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { ListItem } from '../../../shared/models';

@Component({
    selector: 'feriado-tipo-select',
    templateUrl: './feriado-tipo-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FeriadoTipoSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class FeriadoTipoSelectComponent extends InputBaseComponent {
    datas: ListItem[] = [
        { id: -1, text: 'Antecipar' },
        { id: 0, text: 'Postergar' },
        { id: 1, text: 'Mesmo Dia' },
    ];
}
