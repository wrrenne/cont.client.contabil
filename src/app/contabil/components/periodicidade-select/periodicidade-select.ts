import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { ListItem } from '../../../shared/models';
import { TPeriodicidade } from '../../models/enums';

@Component({
    selector: 'periodicidade-select',
    templateUrl: './periodicidade-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PeriodicidadeSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class PeriodicidadeSelectComponent extends InputBaseComponent {
    datas: ListItem[] = [
        { id: TPeriodicidade.Mensal, text: 'Mensal' },
        { id: TPeriodicidade.Anual, text: 'Anual' },
    ];
}
