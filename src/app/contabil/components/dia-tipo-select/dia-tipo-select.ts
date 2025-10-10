import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { ListItem } from '../../../shared/models';
import { TDiaTipo } from '../../models/enums';

@Component({
    selector: 'dia-tipo-select',
    templateUrl: './dia-tipo-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DiaTipoSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class DiaTipoSelectComponent extends InputBaseComponent {
    datas: ListItem[] = [
        { id: TDiaTipo.DiasUteis, text: 'Dia Útil' },
        { id: TDiaTipo.DiasFixos, text: 'Dia Fixo' },
    ];
}
