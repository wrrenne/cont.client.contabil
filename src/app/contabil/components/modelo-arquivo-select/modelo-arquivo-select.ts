import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../../../shared/controls/input-base/input-base';

@Component({
    selector: 'modelo-arquivo-select',
    templateUrl: './modelo-arquivo-select.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ModeloArquivoSelectComponent),
            multi: true,
        },
    ],
    standalone: true,
})
export class ModeloArquivoSelectComponent extends InputBaseComponent {}
