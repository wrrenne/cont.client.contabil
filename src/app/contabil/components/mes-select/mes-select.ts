import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { ListItem } from '../../../shared/models';

@Component({
    selector: 'mes-select',
    templateUrl: './mes-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MesSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class MesSelectComponent extends InputBaseComponent {
    datas: ListItem[] = [
        { id: 1, text: 'Janeiro' },
        { id: 2, text: 'Fevereiro' },
        { id: 3, text: 'Março' },
        { id: 4, text: 'Abril' },
        { id: 5, text: 'Maio' },
        { id: 6, text: 'Junho' },
        { id: 7, text: 'Julho' },
        { id: 8, text: 'Agosto' },
        { id: 9, text: 'Setembro' },
        { id: 10, text: 'Outubro' },
        { id: 11, text: 'Novembro' },
        { id: 12, text: 'Dezembro' },
    ];
}
