import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { ListItem } from '../../../shared/models';
import { TPeriodoAnual } from '../../models/enums';

@Component({
    selector: 'periodo-anual-select',
    templateUrl: './periodo-anual-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PeriodoAnualSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class PeriodoAnualSelectComponent extends InputBaseComponent {
    datas: ListItem[] = [
        { id: TPeriodoAnual.MesmoAno, text: 'Mesmo ano da competência' },
        { id: TPeriodoAnual.AnoSeguinte, text: 'Ano seguinte' },
    ];
}
