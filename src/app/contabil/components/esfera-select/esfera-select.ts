import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSelectExComponent } from 'src/app/shared/controls/input-select-ex/input-select-ex';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';
import { ListItem } from '../../../shared/models';
import { TEsfera } from '../../models/enums';

@Component({
    selector: 'esfera-select',
    templateUrl: './esfera-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EsferaSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, InputSelectExComponent],
})
export class EsferaSelectComponent extends InputBaseComponent {
    datas: ListItem[] = [
        { id: TEsfera.Municipal, text: 'Municipal' },
        { id: TEsfera.Estadual, text: 'Estadual' },
        { id: TEsfera.Federal, text: 'Federal' },
    ];
}
