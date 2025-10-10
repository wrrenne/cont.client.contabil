import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { ListItem } from '../../../shared/models';

@Component({
    selector: 'periodo-mensal-select',
    templateUrl: './periodo-mensal-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PeriodoMensalSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class PeriodoMensalSelectComponent extends InputBaseComponent {
    datas: ListItem[] = [
        { id: 0, text: 'Mesmo mês da competência' },
        { id: 1, text: 'Mês seguinte' },
        { id: 2, text: '2º mês seguinte' },
        { id: 3, text: '3º mês seguinte' },
        { id: 4, text: '4º mês seguinte' },
        { id: 5, text: '5º mês seguinte' },
        { id: 6, text: '6º mês seguinte' },
        { id: 7, text: '7º mês seguinte' },
        { id: 8, text: '8º mês seguinte' },
        { id: 9, text: '9º mês seguinte' },
        { id: 10, text: '10º mês seguinte' },
        { id: 11, text: '11º mês seguinte' },
    ];
}
